import React from 'react';
import ReactDOM from 'react-dom'
import logo from './imagens/logo-branca.png'
import {history} from './Historico'
import './styles.css'

export default class Header extends React.Component {
   
    logout(){
    if(this.props.sair === "Sair"){
         history.go("/portallogs")
         sessionStorage.clear();
    } 
    }
    goToHome(){
        if(this.props.home === "Home"){
            history.go("/portallogs/home")
        }
    }

    render() {
        return (
            <div>
               <nav className="navegacao">
                    
                    <span className="tituloPrincipal"><img align="left" className="logo" src={logo}/></span>
                    <span className="opcaoSaidaVoltar" onClick = {e => this.goToHome()}>{this.props.home} {(this.props.home) == "Home" ? <i class="fas fa-home"></i> : ""}  </span>
                    <span className="opcaoSaidaVoltar" onClick = {e => this.logout()}>{this.props.sair} {(this.props.sair) == "Sair" ? <i class="fas fa-sign-out-alt"></i> : ""} </span>
               </nav>
            </div>
        )
    }
}