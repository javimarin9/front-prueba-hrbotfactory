import './App.css';

import Mensajebotones from "./componentes/Mensaje-botones";
import Mensajecarrusel from "./componentes/Mensaje-carrusel";

import React, { useState } from 'react';

function App() {

  //PARAMETROS A PASAR AL COMPONENTE DE BOTONES (TEXTO DEL MENSAJE Y BOTONES)
  const textoMensaje = "¿Cómo estás?";
  const opcionesBotones = ["Bien", "Mal", "Regular"];

  //PARAMETROS A PASAR AL COMPONENTE CARRUSEL (TEXTO DEL MENSAJE, IMAGENES Y TEXTO DE IMAGENES, Y LA OPCION SELECCIONADA POR DEFECTO)
  const textoMensajeCarrusel = "¿Qué te apetece comer hoy?";
  const imagenesCarrusel = [{ url: "./pescado.jpg", texto: "Pescado" },
                            { url: "./hamburguesa.jpg", texto: "Hamburguesa" },
                            { url: "./pollo.jpg", texto: "Pollo" },
                            { url: "./marisco.jpg", texto: "Marisco" },
                            { url: "./paella.jpg", texto: "Paella" }];
  const seleccionada = 2;

  //VARIABLES QUE CAMBIAN Y SE MANEJAN EN FUNCION DE LOS EVENTOS DE LOS COMPONENTES
  const [mensajeBoton, setMensajeBoton] = useState("");
  const [mensajeCarrusel, setMensajeCarrusel] = useState([]);

  const manejarMensajeClick = mensaje => {
    setMensajeBoton(mensaje);
  };

  const manejarMensajeCarrusel = mensaje => {
    setMensajeCarrusel(mensaje);
  };

  //VARIABLE PARA ANYADIR MENSAJES AL CHAT CUANDO ESCRIBE Y ENVIA (UN POCO OPCIONAL)
  const [mensajesChat, setMensajesChat] = useState([]);

  const manejarEnvioChat = (event) => {
    event.preventDefault();
    const mensaje = event.target.elements.chat.value.trim();
    if(mensaje!==""){
      setMensajesChat([...mensajesChat, mensaje]);
      event.target.elements.chat.value = "";
    }
  };

  return (
    <div className="App">
      <div className="cabecera">
        <img src="./Foto_Perfil_.jpg"></img>
        <h1>Juan Antonio</h1>
      </div>
      <div className='chat'>
        <p className="fecha">Hoy</p>
        <div className="divMensajeIzq">
          <img src="./Foto_Perfil_.jpg"></img>
          <div className='contenido'>
            <p className="mensajeIzq">Hola, soy Juan Antonio</p>
          </div>
        </div>
        <div className="divMensajeDer">
            <div className='contenido'>
                <p className="mensajeDer">Hola, Juan Antonio! Cuánto tiempo!</p>
            </div>
        </div>
        {/* COMPONENTE DE BOTONES */}
        <Mensajebotones texto={textoMensaje} botones={opcionesBotones} onMensajeClick={manejarMensajeClick}></Mensajebotones>
        {/* MOSTRAR MENSAJE CUANDO HAYA CONTESTADO AL MENSAJE DE BOTON */}
        {mensajeBoton && (
            <div className="divMensajeDer">
                <div className='contenido'>
                    <p className="mensajeDer">{mensajeBoton}</p>
                </div>
            </div>
        )}
        {/* MOSTRAR COMPONENTE DE CARRUSEL UNA VEZ HAYA CONTESTADO A MENSAJE DEL BOTON */}
        {mensajeBoton && (
          <Mensajecarrusel texto={textoMensajeCarrusel} imagenes={imagenesCarrusel} seleccionada={seleccionada} onMensajeCarrusel={manejarMensajeCarrusel}></Mensajecarrusel>
        )}
        {/* MOSTRAR MENSAJE DE IMAGEN ELEGIDA EN EL CARRUSEL CUANDO HAYA SELECCIONADO Y ENVIADO LA OPCION */}
        {mensajeCarrusel.length>0 && (
            <div className="divMensajeDer">
                <div className='contenido'>
                    <p className="mensajeDer">
                      <img src={mensajeCarrusel[0]} className='mensajeImg'></img>
                      {mensajeCarrusel[1]}
                    </p>
                </div>
            </div>
        )}
        {mensajesChat.map((mensaje, index) => (
          <div key={index} className="divMensajeDer">
              <div className='contenido'>
                  <p className="mensajeDer">{mensaje}</p>
              </div>
          </div>
        ))}
      </div>
      {/* FORMULARIO DE ENVIO MENSAJE CHAT */}
      <div className="enviarMensaje">
        <form onSubmit={manejarEnvioChat}>
          <input type="text" placeholder="Escribe aquí..." name='chat'></input>
          <button type="submit" className='chatBoton'><img src="./send-icon.png" className='enviarImg'></img></button>
        </form>
      </div>
    </div>
  );
}

export default App;
