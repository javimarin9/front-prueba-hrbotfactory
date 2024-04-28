import React, { useEffect } from 'react';

export default function Mensajecarrusel({ texto, imagenes, seleccionada, onMensajeCarrusel }) {

    //SE COMPRUEBA SI EL INDICE PASADO ES CORRECTO (NO NEGATIVO NI MAYOR QUE NUM DE IMAGENES)
    const indiceSelec = seleccionada<0 || seleccionada>=imagenes.length ? 0 : seleccionada;

    useEffect(() => {
        const prev = document.getElementById('botonIzq');
        const sig = document.getElementById('botonDer');
        const items = document.querySelectorAll('.item');
        const enviar = document.getElementById('botonEnviar');
        let enviado = false;

        //EVENTO CLICK PARA PASAR A LA IZQUIERDA EN EL CARRUSEL

        const manejarPasarIzq = () => {
            let cambio = false;
            for(let i=0;i<items.length && !cambio;i++){
                if(items[i].classList.contains("selec") && i>0){
                    console.log(i);
                    items[i].classList.remove("selec");
                    items[i-1].classList.add("selec");
                    items[i-1].classList.remove("prev");
                    if(i-2>=0){
                        items[i-2].classList.add("prev");
                    }
                    cambio=true;
                }
            }
        };
        prev.addEventListener('click', manejarPasarIzq);
        
        //EVENTO CLICK PARA PASAR A LA DERECHA EN EL CARRUSEL
        const manejarPasarDer = () => {
            let cambio = false;
            for(let i=0;i<items.length && !cambio;i++){
                if(items[i].classList.contains("selec") && i+1<items.length){
                    console.log(i);
                    items[i].classList.remove("selec");
                    items[i].classList.add("prev");
                    items[i+1].classList.add("selec");
                    if(i-1>=0){
                        items[i-1].classList.remove("prev");
                    }         
                    cambio=true;
                }
            }
        };
        sig.addEventListener('click', manejarPasarDer);

        //EVENTO CLICK PARA SELECCIONAR LA IMAGEN ACTUAL DEL CARRUSEL Y ENVIARLA
        const manejarEnviarImagen = () => {
            if(!enviar.classList.contains("yaEnviado")){
                for(let i=0;i<items.length && !enviado;i++){
                    if(items[i].classList.contains("selec")){
                        let mensaje = [];
                        mensaje.push(items[i].children[0].getAttribute('src'));
                        mensaje.push(items[i].children[1].textContent);
                        enviar.classList.add('yaEnviado');
                        onMensajeCarrusel(mensaje);
                    }
                }
            }
        };
        enviar.addEventListener('click', manejarEnviarImagen);

        return () => {
            prev.removeEventListener('click', manejarPasarIzq);
            sig.removeEventListener('click', manejarPasarDer);
            enviar.removeEventListener('click', manejarEnviarImagen);
        };

    }, [onMensajeCarrusel]);

    return (
        <div className='divMensajeIzq'>
            <img src="./Foto_Perfil_.jpg"></img>
            <div className='contenido'>
                <p className="mensajeIzq">{texto}</p>
                <div className="carrusel">
                    <button id="botonIzq"><img src='./left-icon.png'></img></button>
                    <div className="lista" id="lista">
                        {imagenes.map((imagen, index) => (
                            <div  key={index} className={index === indiceSelec ? 'item selec' : (index === indiceSelec - 1 ? 'item prev' : 'item')}>
                                <img src={imagen.url}></img>
                                <p>{imagen.texto}</p>
                            </div>
                        ))}
                    </div>
                    <button id="botonDer"><img src='./right-icon.png'></img></button>
                </div>
                <button type='button' className='botonEnviar' id="botonEnviar">Enviar</button>
            </div>
        </div>
    );
  }