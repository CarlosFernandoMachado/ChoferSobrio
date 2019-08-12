import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Historial.css'
import firebase from '../config/config';

export default class Precios extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Chofer',
            accessor: 'chofer',
            maxWidth: 300,
        }, {
            Header: 'Identidad Chofer',
            accessor: 'id_chofer',
            maxWidth: 150,
        }, {
            Header: 'Cliente',
            accessor: 'cliente',
            maxWidth: 150,
        }, {
            Header: 'Color',
            accessor: 'color',
            maxWidth: 80,
        }, {
            Header: 'Destino',
            accessor: 'destino',
            maxWidth: 170,
        }, {
            Header: 'Fecha',
            accessor: 'fecha',
            maxWidth: 100,
        }, {
            Header: 'Hora Pedido',
            accessor: 'hora_pedido',
            maxWidth: 60,
        }, {
            Header: 'Hora Terminado',
            accessor: 'hora_final',
            maxWidth: 60,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 100,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 80,
        }];

        this.state = {
            infoGerente: {},
            historial: [],
            permisos: props.permisos,
        };

        this.mostrarHistorial = this.mostrarHistorial.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/gerente').once('value').then((snap) => {
                const gerentelist = snap.val();
                let infoGerente;
                Object.keys(gerentelist).forEach((key, index) => {
                    const gerente = gerentelist[key];
                    if (gerente.correo === user.email) {
                        gerente.index = index;
                        infoGerente = gerente;
                    }
                });
                return infoGerente;
            });

            // historial
            this.dbRefHistorial = firebase.database().ref('/Historial');
            this.dbCallbackHistorial = this.dbRefHistorial.on('value', snap => this.setState({ historial: snap.val() }));

            this.setState({
                infoGerente: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefHistorial.off('value', this.dbCallbackHistorial);
        }
    }

    mostrarHistorial() {
        const { historial } = this.state;
        const reservaciones = [];
        Object.keys(historial).forEach((key, index) => {
            const pedido = historial[key];
            if (index !== 0) {
                reservaciones.push(pedido);
            }
        })
        return reservaciones;
    }

    render() {
        const pedidos = this.mostrarHistorial();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones Seleccionadas</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Reservaciones Terminadas</h3>
                        <br />
                        <ReactTable
                            data={pedidos}
                            columns={this.columnas}
                            filterable
                        />
                    </Alert>
                </Card>
            </Container>
        )
    }
}