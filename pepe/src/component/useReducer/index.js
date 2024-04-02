import React, { useEffect, useReducer, useState } from 'react';

function UseReducer({name}) {
    //estados
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const SECURITY_CODE = "pepe";

    //handlers btns
    const handeleOnClick = (e) => {
        dispatch({
            type: actionTypes.VALUE,
            payload: e.target.value
        })
    }
    const handleComprobar = () => {
        dispatch({type: actionTypes.COMPROBAR})
    }; 
    const handleConfirmar = () => {
        dispatch({type: actionTypes.CONFIRMAR})
    };
    const handleEliminar = () => {
        dispatch({type: actionTypes.ELIMINAR})
    };
    const handleReset = () => {
        dispatch({type: actionTypes.RESET})        
    };

    //funciones/eventos q van dentro del useEffect - para un codigo mas limpio
    const onCodigoInc = () => {
        dispatch({type: actionTypes.COD_INC})
    };
    const onCodigoCorrecto = () => {
        dispatch({type: actionTypes.COD_CORR})
    };
    
    //utilizo el useEffect para q renderice al cambiar el estado de loading
    //y q dispare 1ro el loading y desp el msj error
    useEffect(() => {
        if(state.loading){
            setTimeout(() => {                
                if(state.value !== SECURITY_CODE){                    
                    onCodigoInc();
                }else{
                    onCodigoCorrecto();
                }
            }, 2000);
        }
    }, [state.loading, state.value]);

    if(!state.eliminar && !state.confirmar){
        return (
            <div>
                <h2>USE REDUCER</h2>
                <p>Por favor <b>{name}</b>, escribe el codigo de seguridad.</p>
                {
                    state.error && (<p>Codigo incorrecto</p>)
                }
                {
                    state.loading && (<p>Cargando...</p>)
                }
                <input 
                    value={state.value} 
                    onChangeCapture={(e) => handeleOnClick(e)} 
                    placeholder='Tu codigo'
                ></input>
                <button 
                    /* onClick={() => setError(prevEstado => !prevEstado) } */
                    onClick={ () => handleComprobar()}
                >
                    Comprobar
                </button> 
            </div>
        )
    }else if(state.eliminar && !state.confirmar){
        return(
            <React.Fragment>
                <p>Estás seguro de borrar?</p>
                <button onClick={() => handleConfirmar()}>SI</button>
                <button onClick={() => handleEliminar()}>NO</button>
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

//-----manejo del reducer-----------------------------------
const initialState = {
    value: '',
    error: false,
    loading: false,
    eliminar: false,
    confirmar: false
}

//creo variables para las action types ASI evito errores de typo
const actionTypes = {
    VALUE: 'VALUE',
    ERROR: 'ERROR',
    LOADING: 'LOADING',
    COMPROBAR: 'COMPROBAR',
    COD_INC: 'COD_INC',
    COD_CORR: 'COD_CORR',
    ELIMINAR: 'ELIMINAR',
    CONFIRMAR: 'CONFIRMAR',
    RESET: 'RESET'
}
const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.VALUE:
            return {
                ...state,
                value: action.payload
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: true
            }
        case actionTypes.LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.COMPROBAR:
            return{
                ...state,
                loading:true
            }
        case actionTypes.COD_INC:
            return{
                ...state,
                loading: false,
                error: true,
                value: "",
            }
        case actionTypes.COD_CORR:
            return {
                ...state,
                error: false,
                value: "",
                eliminar: true,
            }
        case actionTypes.ELIMINAR:
            return{
                ...state,
                eliminar: false
            }
        case actionTypes.CONFIRMAR:
            return{
                ...state,
                confirmar: true
            }
        case actionTypes.RESET:
            return{
                ...state,
                eliminar: false,
                confirmar:false
            }
        default:
            return state;
    }
}

export default UseReducer;