const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC7QDakMVER-zgKRnVgoAZ2g&part=snippet%2Cid&order=date&maxResults=9';

//indica donde vamos a agregar el nuevo html transformado por la api//
const content = null || document.getElementById ('content');

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
      'X-RapidAPI-Key': 'c68edbdba9mshc3cb6eb8038f3b2p1f444ajsna5de19fe1256'
    }
  };


async function fetchData (urlApi){     
 //guarda la direccion de la api y las opciones que nos deja usar//   
    const response = await fetch(urlApi, options);   
    const data = await response.json();    
    return data; }

//ejecuta automaticamente la funcion cuando se carga el archivo/
(async  () => {
    try{
        //carga los videos en la pagina//
        const videos = await fetchData(API);
        //genera un template para cada video//
        //view va a tener un arreglo donde cada valor va a ser un html con el video y su vista//
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
        `).slice(0,4).join('')}
        `;//el slice mostrara solo desde el primer al cuarto video y el join se usa para unir los elementos
        //inserta la vista que creamos en el index.html//
        content.innerHTML = view;
    } catch (error){
        console.log(error);
   }
})();
