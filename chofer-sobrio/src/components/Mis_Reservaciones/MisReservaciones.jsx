/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './MisReservaciones.css'
import firebase from '../config/config';
import swal from 'sweetalert';

export default class MisReservaciones extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 200,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 150,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 150,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 150,
        }, {
            Header: 'Destino',
            accessor: 'destino',
            maxWidth: 200,
        }, {
            Header: 'Fecha',
            accessor: 'fecha',
            maxWidth: 100,
        }, {
            Header: 'Hora',
            accessor: 'hora',
            maxWidth: 100,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 100,
            filterable: false,
        },
        {
            Header: 'Parada',
            accessor: 'parada',
            maxWidth: 100,
            filterable: false,
        }
        ];

        this.state = {
            infoChofer: {},
            pedidos: [],
            permisos: props.permisos,
        };

        this.obtenerPedidos = this.obtenerPedidos.bind(this);
        this.reservar = this.reservar.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/cliente').once('value').then((snap) => {
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
        pedidosRes[keyPedido].estado = 'Disponible';
        delete pedidosRes[keyPedido].accion;
        delete pedidosRes[keyPedido].parada;
        database.ref(`/pedido/${keyPedido}/`).set(pedidosRes[keyPedido]);
    }

    eliminar(keyPedido) {
        if (window.confirm(' Se cancelara su pedido')) {
            const database = firebase.database();
            const { clientes } = this.state;
            database.ref(`pedido/${keyPedido}/`).remove();
        }
    }

    obtenerPedidos() {
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
        const { pedidos, permisos } = this.state;
       

        const listaPedidos = [];

        Object.keys(pedidos).forEach((key, index) => {
            const pedido = pedidos[key];
            var parada12 = pedido.paradas;
            if ((pedido.fecha === today2 || pedido.fecha === tommorrow) && pedido.estado === "Disponible" && this.state.infoChofer.correo === pedido.correo && index !== 0) {

                pedido.accion = <Button variant="info" onClick={() => this.eliminar(key)}>Cancelar</Button>;
                pedido.parada = <Button variant="info" onClick={() => this.mostrarparadas(key,parada12)}>ver paradas</Button>;

                listaPedidos.push(pedido);
            }
        });

        return listaPedidos;
    }
    mostrarparadas(keyPedido, paradas12) {

        swal("Las paradas son:", paradas12);


    }
    render() {
        const pedidos = this.obtenerPedidos();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones Actuales</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <h3>Pedidos</h3>
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