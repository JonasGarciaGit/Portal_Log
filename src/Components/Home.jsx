import React from 'react'
import { render } from '@testing-library/react';
import api from '../Services/Api';
import Main from '../Pages/pages';
import './styles.css';
import Header from './Header';
import { history } from './Historico'

export default class Home extends React.Component {

    state = {
        logs: [],
        page: 0,
        parametroDaBusca: "",
        parametroDaBuscaURL: "",
        logsForFilter: [],
        date: "",
    };


    populateList = async (page = 0, limit = 100, direction = 'desc') => {
        var response = []
        var responseJson = this.state.logs
        while (page == 0) {
            responseJson = await api.get(`?page=${page}&&limit=${limit}&&direction=${direction}`);
            response.push(responseJson.data.Results);
            page += 1;
        }
        this.setState({ logsForFilter: response })
    }

    filtrarLog = () => {
        const { logsForFilter, parametroDaBusca, date , parametroDaBuscaURL} = this.state

        var listWithResults = []
        this.setState({ logs: [] });


        if (parametroDaBusca == "" && date == "" && parametroDaBuscaURL == "") {
            alert("Nenhum parametro de busca informado!")
        }
        else if (parametroDaBusca != "" && date != "" ||
                 parametroDaBusca != "" && parametroDaBuscaURL != "" ||
                 date != "" && parametroDaBuscaURL != ""||
                 parametroDaBusca != "" && date != "" && parametroDaBuscaURL != "") {
            for (var i = 0; i <= logsForFilter.length - 1; i++) {
                for (var j = 0; j <= logsForFilter[i].length - 1; j++) {
                    if (
                        logsForFilter[i][j].uuid == parametroDaBusca && logsForFilter[i][j].date.substring(0, 10) == date ||
                        logsForFilter[i][j].uuid == parametroDaBusca &&  logsForFilter[i][j].url == parametroDaBuscaURL ||
                        logsForFilter[i][j].url == parametroDaBuscaURL && logsForFilter[i][j].date.substring(0, 10) == date ||
                        logsForFilter[i][j].uuid == parametroDaBusca && logsForFilter[i][j].date.substring(0, 10) == date && logsForFilter[i][j].url == parametroDaBuscaURL ) {
                        listWithResults.push(logsForFilter[i][j])
                    }
                }
            }
        } else {
            for (var i = 0; i <= logsForFilter.length - 1; i++) {
                for (var j = 0; j <= logsForFilter[i].length - 1; j++) {
                    if (logsForFilter[i][j].uuid == parametroDaBusca ||
                        logsForFilter[i][j].date.substring(0, 10) == date ||
                        logsForFilter[i][j].url == parametroDaBuscaURL) {
                        listWithResults.push(logsForFilter[i][j])
                    }
                }
            }
        }

        this.setState({date: ""})
        document.getElementById("inputDate").value = ""
        this.setState({ logs: listWithResults });
        // this.setState({parametroDaBuscaURL: ""})
        // document.getElementById("inputURL").value = ""
        // this.setState({parametroDaBusca: ""})
        // document.getElementById("inputUuid").value = ""
        
    }

    getDate(e) {
        this.setState({ date: e.target.value })
    }

    alterarParametroBusca(e) {
        this.setState({ parametroDaBusca: e.target.value })
    }

    alterarParametroBuscaURL(e){
        this.setState({parametroDaBuscaURL: e.target.value})
    }

    componentDidMount() {
        this.loadLogs();
    }

    loadLogs = async (page = 0, limit = 10, direction = 'desc') => {
        const response = await api.get(`?page=${page}&&limit=${limit}&&direction=${direction}`);
        this.setState({ logs: response.data.Results, page });
        this.populateList()
    };

    prevPage = () => {
        const { page } = this.state;

        const pageNumber = page - 1;

        this.loadLogs(pageNumber);
    }

    nextpage = () => {
        const { page } = this.state;

        const pageNumber = page + 1;

        this.loadLogs(pageNumber);
    }

    moreDetails = (id) => {
        var log = document.getElementById(id)
        log.classList.toggle('logData');
    }

    render() {

        const { logs, page } = this.state;

        return (
            <div>
                <Header home="Home" sair="Sair"/>

                <div className="logs-list">
                    <div class="submit-line">
                        <input id="inputUuid" onChange={e => this.alterarParametroBusca(e)} type="text" placeholder="Digite o uuid..." />
                        <button class="submit-lente" type="submit">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <input id="inputDate" onChange={e => this.getDate(e)} type="date"></input>
                    <input id="inputURL" onChange={e => this.alterarParametroBuscaURL(e)} type="text" placeholder="Digite o endpoint..."></input>
                    <button className="btnAplicarFiltro" onClick={e => this.filtrarLog()}>Aplicar Filtros</button>
                    <p>&nbsp;</p>
                    {logs.map(log => (
                        <article>
                            <div key={log.id} id={log.id} className='logData'>
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
                            <button onClick={e => this.moreDetails(log.id)}>Detalhes</button>
                        </article>
                    ))}
                    <div className="actions">
                        <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
                        <button onClick={this.nextpage}>Proximo</button>
                    </div>
                </div>
            </div>
        );
    }
}

