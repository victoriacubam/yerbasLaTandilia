"use strict";

let numero1 = Math.ceil ((Math.random() * 10000));
let numero2 = Math.ceil ((Math.random() * 10000));
let resultadoCaptcha = numero1 + numero2;
document.querySelector("#codigoCaptcha").innerHTML= resultadoCaptcha;

let formContacto = document.querySelector("#formulario");
formContacto.addEventListener('submit', validarForm);
    

function validarForm(e) {
    e.preventDefault();
    let captcha = document.querySelector("#captcha").value;
    let validacion = document.querySelector("#validacion");
    let errorCaptcha = document.querySelector("#errorCaptcha");
    if ((captcha!= resultadoCaptcha)) {
        errorCaptcha.innerHTML= "Captcha incorrecto"; 
        validacion.innerHTML=" ";
    }

    else {
        errorCaptcha.innerHTML= ""; 
        validacion.innerHTML= "Tus datos se han enviado con exito";
        formContacto.reset();
    }
}




 





    

