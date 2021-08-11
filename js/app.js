const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda);
})


function validarBusqueda(e){
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;


    if(busqueda.length < 3) {
        mostrarMensaje('la busqueda es muy corta');
        return;
    }

    consultarAPI(busqueda);
}


function consultarAPI(busqueda){
    const githubUrl = `https://remotive.io/api/remote-jobs?search=${busqueda}`;
    


    axios.get(githubUrl)
              .then(respuesta => mostrarVacantes(respuesta.data.jobs));
}

function mostrarMensaje (msg){

    const alertaPrevia = document.querySelector('.alerta');

    if(!alertaPrevia){

        const alerta = document.createElement('div');
        alerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        alerta.textContent = msg;
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
    
            alerta.remove();
            
        }, 3000);


    };

   

};


function mostrarVacantes(vacantes){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    if(vacantes.length > 0){
        resultado.classList.add('grid');


        vacantes.forEach(vacante => {


            const {company_name, title, job_type, candidate_required_location, publication_date, url  } = vacante;


        resultado.innerHTML += `

        <div class="shadow bg-white p-6 rounded">
        <h2 class="text-2xl font-light mb-4">${title}</h2>
        <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company_name} </span></p>
        <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${job_type} </span></p>
        <p class="font-bold uppercase">Pais de oferta:   <span class="font-light normal-case">${candidate_required_location} </span></p>
        <p class="font-bold uppercase">Fecha de publicación:   <span class="font-light normal-case">${publication_date} </span></p>
        <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
    </div>
        
        `;


            
            
        });

        

    }

}