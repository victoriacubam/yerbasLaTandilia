"use strict"

const URL='https://62b5df9d42c6473c4b3c124b.mockapi.io/api/v1/coments';
let id = 0;

document.addEventListener('DOMContentLoaded', cargarComentarios);

//GET: Traer los objetos del mockapi
async function cargarComentarios(){
    let comentariosTabla = document.querySelector("#seccionComentarios");
    comentariosTabla.innerHTML="";
    try {
        let response = await fetch(URL, {
            "method": "GET"
        }); //Get URL
        let data = await response.json();  
        if (response.ok){
            for (let comentarios of data){
            let nombre = comentarios.nombre;
            let comentario = comentarios.comentario;
            id = comentarios.id;
            comentariosTabla.innerHTML += 
                `<tr id="${id}">
                    <td>${nombre}</td>
                    <td>${comentario}</td>
                    <td class="filaBotonesTabla">
                        <button type="button" class="btnBorrar" data-borrar-id="${id}">Borrar</button>
                        <button type="button" class="btnEditar" data-editar-id="${id}">Editar</button>
                    </td>
                 </tr>`        
                document.querySelector("#formComentarios").reset();
            }            
            asignarEventoBotones();
        }
    } catch (error) {
        console.log(error);
    }
}

//Asigno los botones a cada fila de la tabla
function asignarEventoBotones(){
    let botonesEliminar = document.querySelectorAll(".btnBorrar");
    for (let borrar of botonesEliminar){
        borrar.addEventListener('click', function(){     
            eliminarComentario(borrar.dataset.borrarId);
        });
    }
    let botonesEditar = document.querySelectorAll(".btnEditar");
     for (let editar of botonesEditar){
        editar.addEventListener('click', function(){       
            editarFormulario(editar.dataset.editarId);
        });
    }   
} 

//POST: Subir al mockApi (solo el recurso)
document.querySelector("#formComentarios").addEventListener('submit', agregarComentario);
let mensaje = document.querySelector("#mensajeTabla");

async function agregarComentario(e){
    e.preventDefault();
    let nombre = document.querySelector("#nombreComentario").value;
    let comentario = document.querySelector("#comentario").value;
    let comentarioNuevo = {
        "nombre": nombre,
        "comentario": comentario
    }
    try {
        let response = await fetch(URL, {
            "method": 'POST',
            "headers": {
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify(comentarioNuevo)  
        });
        let data = await response.json();
        cargarComentarios();
        mensaje.innerHTML="¡Gracias por tu comentario!";
    } catch (error) {
        console.log(error);
    }
}

//DELETE: Borrar un elemento especifico del mockapi
async function eliminarComentario(id){ //id = boton.dataset.borrarId
    try {
        let response = await fetch(`${URL}/${id}`, {
            "method":"DELETE"
        })
        let data = response.json();
        console.log("Comentario id: " + id + " eliminado");
        mensaje.innerHTML="Comentario eliminado con exito!";
        document.getElementById(`${id}`).remove(); //Borra la fila con el id
    } catch {
        console.log("error")
    }
}

function editarFormulario(id){
    let formularioEditar = document.querySelector("#formEditar");
    formularioEditar.classList.toggle("oculto");
    document.querySelector("#btnFormularioEditar").addEventListener("click", function(){ 
        editarComentario(id)
    });
    formularioEditar.reset();
}

//PUT:Editar el mockapi (algo especifico de la tabla)
async function editarComentario(id){ //id = boton.dataset.editarId
    let nombre = document.querySelector("#inputEditarNombre").value;
    let comentario = document.querySelector("#inputEditarComentario").value;
    let comentarioEditado = {
        "nombre": nombre,
        "comentario": comentario 
    } 
    if((nombre!="")||(comentario!="")){
        try {
            let response = await fetch(`${URL}/${id}`, {
                "method": 'PUT',
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(comentarioEditado)  
            });
            let data = response.json();
            cargarComentarios();
            console.log("Comentario id: " + id  + " editado");
            mensaje.innerHTML="Comentario editado con exito!";
        } catch {
            console.log("error")
        } 
    } else{
        console.log("Los campos estan vacios");
        mensaje.innerHTML="No es posible editar si los campos estan vacios";
    }
}



