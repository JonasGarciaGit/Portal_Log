import React from 'react'
import { render } from '@testing-library/react';
import api from '../Services/Api';
import Main from '../Pages/pages';
import './styles.css';
import Header from './Header';

export default class Home extends React.Component {

    state = {
        logs: [],
        page: 0
    };

    componentDidMount() {
        this.loadLogs();
    }

    loadLogs = async (page = 0, limit = 5, direction = 'desc') => {
         const response = await api.get(`?page=${page}&&limit=${limit}&&direction=${direction}`);

        console.log(response.data.Results);
        this.setState({ logs: response.data.Results, page });
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
                <Header />

                <div className="logs-list">
                    <div class="submit-line">
                        <input type="text" />
                        <button class="submit-lente" type="submit">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
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

