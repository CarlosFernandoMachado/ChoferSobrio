import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import './MiPerfil.css'
import ReactTable from 'react-table';
import firebase from '../config/config';

export default class Precios extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Mensaje',
            accessor: 'mensaje',
            maxWidth: 200,
            filterable: false,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 100,
            filterable: false,
        }, {
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 100,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 100,
        }, {
            Header: 'Ubicacion',
            accessor: 'ubicacion',
            maxWidth: 100,
        }, {
            Header: 'Destino',
            accessor: 'destino',
            maxWidth: 100,
        }, {
            Header: 'Fecha',
            accessor: 'fecha',
            maxWidth: 100,
        }, {
            Header: 'Hora',
            accessor: 'hora',
            maxWidth: 50,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 100,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 100,
        }, {
            Header: 'Color',
            accessor: 'color',
            maxWidth: 60,
        }];

        this.state = {
            infoChofer: {},
            pedidos: [],
            permisos: props.permisos,
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

        const pedidosRes = pedidos.map(a => Object.assign({}, a));

        pedidosRes[keyPedido].mensaje = mensaje;
        delete pedidosRes[keyPedido].accion;
        database.ref(`/pedido/${keyPedido}/`).set(pedidosRes[keyPedido]);
        this.setState({ pedidos: pedidosRes });
    }

    finalizar(keyPedido) {
        if (window.confirm('¿Desea finalizar la reservacion?')) {
            const database = firebase.database();
            const { pedidos } = this.state;

            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes();
            const pedidosRes = pedidos.map(a => Object.assign({}, a));
            pedidosRes[keyPedido].estado = 'Finalizado';
            delete pedidosRes[keyPedido].mensaje;
            delete pedidosRes[keyPedido].accion;
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
    }

    mostrarPedidos() {
        const { infoChofer, pedidos } = this.state;

        const listapedidos = [];

        Object.keys(pedidos).forEach((key, index) => {
            const pedido = pedidos[key];
            if (pedido.idchofer === infoChofer.identidad && pedido.estado === "Ocupado" && index !== 0) {
                let msjBoton = React.isValidElement(pedido.mensaje) ? pedido.mensaje.props.children : '';

                if (pedido.mensaje === undefined || pedido.mensaje === 'ninguno') {
                    msjBoton = this.mensajes[1];
                } else if (pedido.mensaje === this.mensajes[1]) {
                    msjBoton = this.mensajes[2];
                } else if (pedido.mensaje === this.mensajes[2]) {
                    msjBoton = this.mensajes[3];
                } else if (pedido.mensaje === this.mensajes[3]) {
                    msjBoton = 'Finalice';
                }

                pedido.mensaje = <Button variant="info" onClick={() => this.clickBoton(msjBoton, key)}>{msjBoton}</Button>;
                pedido.accion = <Button variant="danger" onClick={() => this.finalizar(key)}>Finalizar</Button>;
            
                listapedidos.push(pedido);
            }
        })

        return listapedidos;
    }

    render() {
        const pedidos = this.mostrarPedidos();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones Seleccionadas</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <h3>Mis Reservaciones</h3>
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
