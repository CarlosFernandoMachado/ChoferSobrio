/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { Jumbotron, Container, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Pedidos.css'
import firebase from '../config/config';
import mapa from '../Map/mapa';

export default class Precios extends Component {

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
            Header: 'Ubicacion',
            accessor: 'ubicacion',
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
        }, {
            Header: 'Mapa',
            accessor: 'mapa',
            maxWidth: 100,
            filterable: false,
        }];

        this.state = {
            infoChofer: {},
            pedidos: [],
            permisos: props.permisos,
            lat: 14.0818,
            lon: -87.20681,
        };

        this.obtenerPedidos = this.obtenerPedidos.bind(this);
        this.reservar = this.reservar.bind(this);
        this.mostrarUbicacion = this.mostrarUbicacion.bind(this);
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
        const { pedidos, infoChofer } = this.state;
        const { identidad } = infoChofer;
        let tienePedido = false;

        // revisar si ya tiene pedidos
        Object.keys(pedidos).forEach((key) => {
            const pedido = pedidos[key];
            if (pedido.estado === "Finalizado") {
                return;
            }

            if (!tienePedido && identidad === pedido.idchofer) {
                tienePedido = true;
                alert("Tiene un pedido pendiente");
            }
        });

        if (!tienePedido) {
            const pedidosRes = pedidos.map(a => Object.assign({}, a));
            pedidosRes[keyPedido].estado = 'Ocupado';
            pedidosRes[keyPedido].idchofer = this.state.infoChofer.identidad;
            delete pedidosRes[keyPedido].accion;
            delete pedidosRes[keyPedido].mapa;
            database.ref(`/pedido/${keyPedido}/`).set(pedidosRes[keyPedido]);
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
            if ((pedido.fecha === today2 || pedido.fecha === tommorrow) && pedido.estado === "Disponible" && index !== 0) {

                if (permisos.chofer) {
                    pedido.accion = <Button variant="info" onClick={() => this.reservar(key)}>Reservar</Button>;
                    pedido.mapa = <Button variant="info" onClick={() => this.mostrarUbicacion(key)}>Localizar</Button>;
                }

                listaPedidos.push(pedido);
            }
        });

        return listaPedidos;
    }

    mostrarUbicacion(keyPedido) {
        const { pedidos } = this.state;
        const pedidosRes = pedidos.map(a => Object.assign({}, a));
        var coordenadas = pedidosRes[keyPedido].ubicacion.split(",");
        var latitud = Number(parseFloat(coordenadas[0]).toFixed(4));
        var longitud = Number(parseFloat(coordenadas[1]).toFixed(4));
        this.setState({ lat: latitud });
        this.setState({ lon: longitud });
        this.renderMap();
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyArotdf5MfhV5c3VmS_KrgosKN4fZgwnrE&callback=initMap")
        window.initMap = this.initMap
    }

    initMap = () => {
        var lat = Number(parseFloat(this.state.lat).toFixed(4));
        var lon = Number(parseFloat(this.state.lon).toFixed(4));
        var tegucigalpa = { lat: lat, lng: lon };
        var map = new window.google.maps.Map(
            document.getElementById('map'), { zoom: 18, center: tegucigalpa });
        var marker = new window.google.maps.Marker({ position: tegucigalpa, map: map });
    }

    render() {
        const pedidos = this.obtenerPedidos();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones de hoy y mañana</h5>
                </Jumbotron>
                <div className="outer-div">
                    <div className="table-div">
                        <h3>Pedidos</h3>
                        <br />
                        <ReactTable
                            data={pedidos}
                            columns={this.columnas}
                            filterable
                        />
                        <div className="spacer-div"/>
                    </div>
                    <div className="map-div" id="map">
                    </div>
                </div>
            </Container>
        )
    }
}
function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}