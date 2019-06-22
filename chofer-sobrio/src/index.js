import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';

Object.assign(ReactTableDefaults, {
    filterable: true,
    defaultPageSize: 5,
    previousText: 'Anterior',
    nextText: 'Siguiente',
    loadingText: 'Cargando...',
    noDataText: 'No se encontraron datos',
    pageText: 'Pagina',
    ofText: 'de',
    rowsText: 'datos',
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
