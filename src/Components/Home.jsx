import React from 'react'
import { render } from '@testing-library/react';
import api from '../Services/Api';
import Main from '../Pages/pages';
import './styles.css';
import Header from './Header';

export default class Home extends React.Component{
    
    state = {
        logs: [],
    };

    componentDidMount(){
        this.loadLogs();
    }
    
    loadLogs = async() =>{
        const response = await api.get();

        console.log(response.data.Results);
        this.setState({logs : response.data.Results});
    };

    prevPage = () => {}

    nextpage = () => {}

    render(){

        const {logs} = this.state;

        return(
            <div>
                <Header/>
                
                <div className="logs-list">
                <input id="searchBar"></input>
                    {logs.map(log => (
                        <article key={log.id}>
                            <strong>{log.id}</strong>
                            <p>{log.date}</p>
                            <p>{log.url}</p>
                        <   p>{log.responseBody}</p>
                            <a href="">Detalhes</a>
                        </article>
                    ))}
                    <div className="actions">
                        <button onClick ={this.prevPage}>Anterior</button>
                        <button onClick ={this.nextPage}>Proximo</button>
                    </div>
                </div>
            </div>
        );
    }
}
    
    
