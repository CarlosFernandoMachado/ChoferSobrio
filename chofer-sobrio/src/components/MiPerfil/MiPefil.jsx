import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Dropdown, Button } from 'react-bootstrap';
import './MiPerfil.css'
import firebase from '../config/config';

export default class Precios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoChofer: {},
            pedidos: [],
        };

        this.clickBoton = this.clickBoton.bind(this);
        this.mostrarPedidos = this.mostrarPedidos.bind(this);
    }

    mensajes = ['ninguno', 'Estoy en camino', 'Estoy cerca', 'Ya llegue'];

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

    clickBoton(mensaje, keyPedido) {
        const database = firebase.database();
        const { pedidos } = this.state;
        let mensajeRes = mensaje;
        let mensajeActual = mensaje;

        const pedidosRes = pedidos.map(a => Object.assign({}, a));
        if (mensaje === undefined || mensaje === 'ninguno') {
            mensajeActual = this.mensajes[1];
        } else if (mensaje === this.mensajes[1]) {
            mensajeRes = this.mensajes[2];
        } else if (mensaje === this.mensajes[2]) {
            mensajeRes = this.mensajes[3];
        } else if (mensaje === this.mensajes[3]) {
        }


        pedidosRes[keyPedido].mensaje = mensajeActual;
        database.ref(`/pedido/${keyPedido}/`).set(pedidosRes[keyPedido]);
        pedidosRes[keyPedido].mensaje = mensajeRes;
        this.setState({ pedidos: pedidosRes });
    }

    mostrarPedidos() {
        const { pedidos, infoChofer } = this.state;

        const pedidosJSX = [];

        Object.keys(pedidos).forEach((key, index) => {
            const pedido = pedidos[key];
            if (pedido.idchofer === infoChofer.identidad) {
                const { color, destino, estado, fecha, hora, marca, nombre, placa, telefono, ubicacion, mensaje } = pedido;

                let msjBoton = '';

                if (mensaje === undefined || mensaje === 'ninguno' || mensaje === this.mensajes[1]) {
                    msjBoton = this.mensajes[1];
                } else if (mensaje === this.mensajes[2]) {
                    msjBoton = this.mensajes[2];
                } else if (mensaje === this.mensajes[3]) {
                    msjBoton = this.mensajes[3];
                }

                pedidosJSX.push(
                    <tr key={index}>
                        <td>
                            <Button variant="info" onClick={() => this.clickBoton(msjBoton, key)}>{msjBoton}</Button>
                        </td>
                        <td>{nombre}</td>
                        <td>{telefono}</td>
                        <td>{ubicacion}</td>
                        <td>{destino}</td>
                        <td>{fecha}</td>
                        <td>{hora}</td>
                        <td>{placa}</td>
                        <td>{marca}</td>
                        <td>{color}</td>
                        <td>{estado}</td>
                    </tr>
                );
            }
        })

        return pedidosJSX;
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
                                    <th>Mensaje</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Ubicacion</th>
                                    <th>Destino</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Placa</th>
                                    <th>Marca</th>
                                    <th>Color</th>
                                    <th>Estado</th>
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
