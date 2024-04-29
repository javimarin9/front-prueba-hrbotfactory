import React, { useEffect } from 'react';

export default function Mensajebotones({ texto, botones, onMensajeClick }) {
    useEffect(() => {
        const botones = document.querySelectorAll('.botones button');

        const manejarClickBoton = (event) => {
            const boton = event.target;
            const botonSeleccionado = document.querySelector('.botones .botonSelec');
    
            if (!botonSeleccionado) {
                const mensaje = boton.textContent;
                boton.classList.add('botonSelec');
                onMensajeClick(mensaje);
            }
        };

        botones.forEach(boton => {
            boton.addEventListener('click', manejarClickBoton);
        });

        return () => {
            botones.forEach(boton => {
                boton.removeEventListener('click', manejarClickBoton);
            });
        };

    }, [onMensajeClick]);

    return (
        <div className="divMensajeIzq">
            <img src="./Foto_Perfil_.jpg"></img>
            <div className='contenido'>
                <p className="mensajeIzq">{texto}</p>
                <div className="botones">
                    {botones.map((boton, index) => (
                        <button type='button' key={index}>{boton}</button>
                    ))}
                </div>
            </div>
        </div>
    );
  }
