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

    moreDetails = (id) =>{
        var log = document.getElementById(id)
        log.classList.toggle('logData');
    }

    render(){

        const {logs} = this.state;

        return(
            <div>
                <Header/>
                
                <div className="logs-list">
                <input id="searchBar"></input>
                    {logs.map(log => (
                        <article key={log.id}>
                            <div id = {log.id} className = 'logData'>
                                <strong>Uuid :: {log.uuid}</strong>
                                <p><strong>Id :: </strong>{log.id}</p>
                                <p><strong>Date :: </strong>{log.date}</p>
                                <p><strong>Url :: </strong>{log.url}</p>
                                <p><strong>RequestBody :: </strong>{log.requestBody}</p>
                                <p><strong>ResponseBody :: </strong>{log.responseBody}</p>
                                <p><strong>ResponseVMX :: </strong>{log.responseVmx}</p>                          
                                <p><strong>Name :: </strong>{log.name}</p>
                                <p><strong>Method :: </strong>{log.method}</p>
                                <p><strong>HttpStatusCode :: </strong>{log.httpStatusCode}</p>
                                <p><strong>Environment :: </strong>{log.environment}</p>
                                <p><strong>DeviceInfo :: </strong>{log.deviceInfo}</p>
                                <p><strong>CompanyName :: </strong>{log.companyName}</p>
                                <p><strong>AppVersion :: </strong>{log.appVersion}</p>
                                <p><strong>Product :: </strong>{log.product}</p>
                                <p><strong>Lon :: </strong>{log.location.lon}</p>
                                <p><strong>Lat :: </strong>{log.location.lat}</p>                         
                            </div>
                            <button onClick = {e => this.moreDetails(log.id)}>Detalhes</button>
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
    
    
