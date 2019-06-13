import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert } from 'react-bootstrap';
import './Historial.css'
import firebase from '../config/config';

export default class Precios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoGerente: {},
            historial: [],
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
        const { historial, infoGerente } = this.state;
        const historialJSX = [];
        Object.keys(historial).forEach((key, index) => {
            const pedido = historial[key];
            if (index !== 0) {
                const { chofer, id_chofer, cliente, color, destino, fecha, hora_pedido, hora_final, marca, placa, ubicacion } = pedido;
                historialJSX.push(
                    <tr key={index}>
                        <td>{chofer}</td>
                        <td>{id_chofer}</td>
                        <td>{cliente}</td>
                        <td>{color}</td>
                        <td>{destino}</td>
                        <td>{fecha}</td>
                        <td>{hora_pedido}</td>
                        <td>{hora_final}</td>
                        <td>{marca}</td>
                        <td>{placa}</td>
                        <td>{ubicacion}</td>
                    </tr>
                );
            }
        })
        return historialJSX;
    }

    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones Seleccionadas</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Chofer</th>
                                    <th>Identidad Chofer</th>
                                    <th>Cliente</th>
                                    <th>Color</th>
                                    <th>Destino</th>
                                    <th>Fecha</th>
                                    <th>Hora Pedido</th>
                                    <th>Hora Terminada</th>
                                    <th>Marca</th>
                                    <th>Placa</th>
                                    <th>ubicacion</th>
                                </tr>
                            </thead>
                            <tbody id="table_body">
                                {this.mostrarHistorial()}
                            </tbody>
                        </Table>
                    </Alert>
                </Card>
            </Container>
        )
    }
}