/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button } from 'react-bootstrap';
import './Pedidos.css'
import firebase from '../config/config';

export default class Precios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoChofer: {},
            pedidos: [],
            permisos: props.permisos,
        };

        this.mostrarPedidos = this.mostrarPedidos.bind(this);
        this.reservar = this.reservar.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/chofer').once('value').then((snap) => {
                const choferlist = snap.val();
                let infoChofer;
                Object.keys(choferlist).forEach((key, index) => {
                    const chofer = choferlist[key];
                    if (chofer.correo === user.email) {
                        chofer.index = index;
                        infoChofer = chofer;
                    }
                });
                return infoChofer;
            });

            // pedidos
            this.dbRefPedidos = firebase.database().ref('/pedido');
            this.dbCallbackPedidos = this.dbRefPedidos.on('value', snap => this.setState({ pedidos: snap.val() }));

            this.setState({
                infoChofer: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefPedidos.off('value', this.dbCallbackPedidos);
        }
    }

    reservar(keyPedido) {
        const database = firebase.database();
        const { pedidos } = this.state;

        const pedidosRes = pedidos.map(a => Object.assign({}, a));
        pedidosRes[keyPedido].estado = 'Ocupado';
        pedidosRes[keyPedido].idchofer = this.state.infoChofer.identidad;
        database.ref(`/pedido/${keyPedido}/`).set(pedidosRes[keyPedido]);
    }

    mostrarPedidos() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var tommorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = tommorrow.getDate()
        var month = tommorrow.getMonth() + 1
        var year = tommorrow.getFullYear()
        var today2 = dd + '/' + mm + '/' + yyyy;
        tommorrow = day + '/' + month + '/' + year;
        const { pedidos, infoChofer, permisos } = this.state;

        const pedidosJSX = [];

        Object.keys(pedidos).forEach((key, index) => {
            const pedido = pedidos[key];
            if ( (pedido.fecha === today2 || pedido.fecha === tommorrow) && pedido.estado === "Disponible" && index !== 0) {
                const { nombre, telefono, ubicacion, destino, hora, fecha} = pedido;

                pedidosJSX.push(
                    <tr key={index}>
                        <td>{nombre}</td>
                        <td>{telefono}</td>
                        <td>{ubicacion}</td>
                        <td>{destino}</td>
                        <td>{fecha}</td>
                        <td>{hora}</td>
                        {permisos.chofer ? <td><Button variant="info" onClick={() => this.reservar(key)}>Reservar</Button></td> : null}
                    </tr>
                );
            }
        })

        return pedidosJSX;
    }    
    
    render() {
        const { permisos } = this.state;
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones de hoy y mañana</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Ubicacion</th>
                                    <th>Destino</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    {permisos.chofer ? <th>Accion</th> : null}
                                </tr>
                            </thead>
                            <tbody id="table_body">
                                {this.mostrarPedidos()}
                            </tbody>
                        </Table>
                    </Alert>
                </Card>
            </Container>
        )
    }
}