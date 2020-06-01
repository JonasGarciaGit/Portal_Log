import React from 'react';
import ReactDOM from 'react-dom'
import logo from './imagens/logo-branca.png'
import {history} from './Historico'
import './styles.css'

export default class Header extends React.Component {
   
    voltar(){
    history.goBack()
        if(this.props.nome === "Sair"){
           sessionStorage.clear();
        } 
    }

    render() {
        return (
            <div>
               <nav className="navegacao">
                    
                    <span className="tituloPrincipal"><img align="left" className="logo" src={logo}/></span>
                    <span className="opcaoSaidaVoltar" onClick = {e => this.voltar()}>{this.props.nome} {(this.props.nome) == "Sair" ? <i class="fas fa-sign-out-alt"></i> : (this.props.nome) == "Voltar" ? <i class="fas fa-undo-alt"></i> : ""}  </span>
               </nav>
            </div>
        )
    }
}