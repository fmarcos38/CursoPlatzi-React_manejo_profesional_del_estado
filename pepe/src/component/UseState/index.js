import React, { useEffect, useState } from 'react';

function UseState({name}) {
    //estados
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [eliminar, setEliminar] = useState(false);
    const [confirmar, setConfirmar] = useState(false);
    const SECURITY_CODE = "pepe";
    //handlers btns
    const handeleOnClick = () => {
        setLoading(true);
    }
    const handleReset = () => {
        setEliminar(false); 
        setConfirmar(false);
    };
    const onChangeValue = (e) => {
        setValue(e.target.value);
    };
    //funciones/eventos q van dentro del useEffect - para un codigo mas limpio
    const onCodigoInc = () => {
        setLoading(false);
        setError(true);
        setValue("");
    };
    const onCodigoCorrecto = () => {
        setError(false);
        setValue("");
        setEliminar(true);
    };
    //utilizo el useEffect para q renderice al cambiar el estado de loading
    //y q dispare 1ro el loading y desp el msj error
    useEffect(() => {
        if(loading){
            setTimeout(() => {                
                if(value !== SECURITY_CODE){
                    onCodigoInc();
                }else{
                    onCodigoCorrecto();
                }
            }, 2000);
        }
    }, [loading, value]);

    if(!eliminar && !confirmar){
        return (
            <div>
                <h2>USE STATE</h2>
                <p>Por favor <b>{name}</b>, escribe el codigo de seguridad.</p>
                {
                    error && (<p>Codigo incorrecto</p>)
                }
                {
                    loading && (<p>Cargando...</p>)
                }
                <input value={value} onChange={(e) => onChangeValue(e)} placeholder='Tu codigo'></input>
                <button 
                    /* onClick={() => setError(prevEstado => !prevEstado) } */
                    onClick={ () => handeleOnClick()}
                >
                    Comprobar
                </button> 
            </div>
        )
    }else if(eliminar && !confirmar){
        return(
            <React.Fragment>
                <p>Estás seguro de borrar?</p>
                <button onClick={() => {setConfirmar(true)}}>SI</button>
                <button onClick={() => {setEliminar(false)}}>NO</button>
            </React.Fragment>
            
        )
    }else{
        return(
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button onClick={() => handleReset()} >Resetear, volver atrás</button>
            </React.Fragment>            
        )
    }
}

export default UseState