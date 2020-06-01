import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Components/Header'
import axios from 'axios'
import { history } from './Historico'
import {Link} from 'react-router-dom'
import './styles.css';



export default class Login extends React.Component {


    state = {
        login: "",
        senha: "",
    }

    validarLogin(state) {
        if (state.login == "" || state.senha == "") {
            return alert('Os campos login e senha não podem estar vazios!')
        }
        axios.post("http://localhost:8080/v0/portal/usuario/login", {
            login: state.login,
            senha: state.senha
        })
            .then((response) => {
                var flag = "false"
                console.log(response.data)
                if (response.status == 200) {
                    if(response.data.primeiroAcesso == "true"){
                       /*history.push({
                            pathname:"/primeiroacesso",
                            state:{login: this.state.login }
                        }) */ 
                    }else{
                    for (let i = 0; i < response.data.perfis.length; i++) {
                        for(let j = 0; j < response.data.perfis[i].permissoes.length; j++){
                            if (response.data.perfis[i].permissoes[j] == "ADM") {
                                sessionStorage.setItem('userToken', state.login)
                                history.push('/portallogs/home')
                                flag = "true"
                            }
                        }
                    }
                    if (flag == "false") {
                        alert("A conta não possui acesso ao portal")
                    }
                
                }
            }
            }).catch(function (error) {
                console.log(error)
                alert('Nenhuma conta encontrada para esse login e senha!')
            })
    }

    setLogin(e) {
        this.setState({ login: e.target.value })
    }

    setSenha(e) {
        this.setState({ senha: e.target.value })
    }

    render() {
        const { login, senha } = this.state
        return (
            <div className="fundo">
                <Header />
                <div className="container">
                    <div id="FormularioLogin" className="box">
                        <div className="loginTopo"><h3>Login</h3></div>
                        <input className="inputLogin" type="text" placeholder="Login" value={login} onChange={e => this.setLogin(e)} ></input>
                        <input className="inputLogin" type="password" placeholder="Senha" value={senha} onChange={e => this.setSenha(e)}></input>
                        {/* <Link to="/trocarsenha" id = "esqueciASenha">Esqueci a senha</Link>  */}
                        <button className="btnPadrao" onClick={e => this.validarLogin(this.state)}>Acessar</button>     
                    </div>
                </div>
            </div>
        )
    }
}
