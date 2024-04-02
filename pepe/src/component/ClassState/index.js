import React from 'react'

const SECURITY_CODE = "pepe";

class ClassState extends React.Component {
    //para acceder a las props en los comp de Clase es a través de this
    //para acceder a estado SE debe hacer desde el constructor
    //solo se puede crear un stat, pero asignandole un obj AHI declaro todos los estados q quiera
    //no olvidar el super, ya q el componente es una Clase q extiende
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            value: "",
        }        
    }

    //metodos de cilco de vida
    /* UNSAFE_componentWillMount(){
        console.log("1.componentWillMount")
    } */
    
    /* componentDidMount(){
        console.log("2.DidMount");        
    } */
    
    //cada ves q se realice un cambio en loadig (como el useEffect con [loading])
    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(() => {    
                if(SECURITY_CODE === this.state.value){
                    this.setState({error: false, loading: false, value: ""});
                }else{
                    this.setState({error: true, loading: false, value: ""});
                }            
                
            }, 2000);
        }
    }

    /* componentWillUnmount(){
        console.log("3.WillUnMount")
    } */
    
    handleClickComp(){
        if(this.state.value === SECURITY_CODE){
            this.setState({
                error: false,
                value: ""
            }); 
        }else{
            this.setState({
                error: true,
                value: ""
            });
        }
    }

    handleClickBackend(){
        this.setState({
            loading: true,
            error: false
        });
        
    }

    render(){
        return (
            <div>
                <h2>CLASS STATE</h2>
                <p>Por favor <b>{this.props.name}</b>, escribe el codigo de seguridad.</p>
                {
                    this.state.error && (
                        <p>Codigo incorrecto</p>
                    )
                }
                {
                    this.state.loading && (
                        <p>Cargando...</p>
                    )
                }
                <input value={this.state.value} onChange={(e) => this.setState({value:e.target.value})} placeholder='Tu codigo'></input>
                <button 
                    onClick={() => this.handleClickComp()} /* setState viene en React - por eso extendemos la clase */
                >
                    Comprobar
                </button>
                <button onClick={() => this.handleClickBackend()}>Backend</button>
            </div>
        )
    }
}


export default ClassState