import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button } from 'react-bootstrap';
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
        this.finalizar = this.finalizar.bind(this);
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

    finalizar(keyPedido) {
        const database = firebase.database();
        const { pedidos } = this.state;

        var today = new Date();
        var time = today.getHours() + 1 + ":" + today.getMinutes() + ":" + today.getSeconds();
        alert("son las: "+time);
        const pedidosRes = pedidos.map(a => Object.assign({}, a));
        pedidosRes[keyPedido].estado = 'Finalizado';
        database.ref(`/pedido/${keyPedido}/`).set(pedidosRes[keyPedido]);
        var nombre = this.state.infoChofer.nombre;
        var idchofer = this.state.infoChofer.identidad;
        var id = 0;
        var n = database.ref('/referencias/').once('value').then(function (snapshot) {
            id = (snapshot.val() && snapshot.val().id_historial) || 'Anonymous';
            id++;
            database.ref('Historial/' + id).set({
                chofer: nombre,
                id_chofer: idchofer,
                cliente: pedidosRes[keyPedido].nombre,
                color: pedidosRes[keyPedido].color,
                destino: pedidosRes[keyPedido].destino,
                fecha: pedidosRes[keyPedido].fecha,
                hora_pedido: pedidosRes[keyPedido].hora,
                hora_final: time,
                marca: pedidosRes[keyPedido].marca,
                placa: pedidosRes[keyPedido].placa,
                ubicacion: pedidosRes[keyPedido].ubicacion,        
            });
            database.ref('referencias/').update({
                id_historial: id
            });
        })
    }

    mostrarPedidos() {
        const { pedidos, infoChofer } = this.state;

        const pedidosJSX = [];

        Object.keys(pedidos).forEach((key, index) => {
            const pedido = pedidos[key];
            if (pedido.idchofer === infoChofer.identidad && pedido.estado === "Ocupado") {
                const { color, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion, mensaje } = pedido;

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
                        <td>
                            <Button variant="info" onClick={() => this.finalizar(key)}>Finalizar</Button>
                        </td>
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
                                    <th>Accion</th>
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
