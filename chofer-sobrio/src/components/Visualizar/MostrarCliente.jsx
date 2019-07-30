import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarCliente extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 300,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 150,
        }, {
            Header: 'Correo',
            accessor: 'correo',
            maxWidth: 150,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 100,
        }, {
            Header: 'Color',
            accessor: 'color',
            maxWidth: 100,
        },{
            Header: 'Estado',
            accessor: 'estado',
            maxWidth: 300,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 100,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 100,
            filterable: false,
        }];

        this.state = {
            clientes: [],
            infocliente: {},
            permisos: props.permisos,
        };

        this.mostrarclientes = this.mostrarclientes.bind(this);
        this.eliminar = this.eliminar.bind(this);

    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/cliente').once('value').then((snap) => {
                const clientelist = snap.val();
                let infocliente;
                Object.keys(clientelist).forEach((key, index) => {
                    const cliente = clientelist[key];
                    if (cliente.correo === user.email) {
                        cliente.index = index;
                        infocliente = cliente;
                    }
                });
                return infocliente;
            });

            // gerentes
            this.dbRefcliente = firebase.database().ref('/cliente');
            this.dbCallbackcliente = this.dbRefcliente.on('value', snap => this.setState({ clientes: snap.val() }));

            this.setState({
                infocliente: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefcliente.off('value', this.dbCallbackcliente);
        }
    }

    mostrarclientes() {
        const { clientes } = this.state;

        const usuarios = [];

        Object.keys(clientes).forEach((key, index) => {
            const pedido = clientes[key];
            if (index !== 0 &&  clientes[key].estado==="activo") {
                pedido.accion = <Button variant="danger" onClick={() => this.eliminar(key)}>Eliminar</Button>;
                usuarios.push(pedido);
            }
        })

        return usuarios;
    }


    eliminar(keyPedido) {
        if (window.confirm(' Se eliminara la cuenta')) {
            const database = firebase.database();
            const { clientes } = this.state;
           
            var estadocuenta="inactivo"
            database.ref('cliente/' + keyPedido).update({
                estado:estadocuenta
             });
        }
    }


    render() {
        const pedidos = this.mostrarclientes();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Datos de los Clientes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Clientes Existentes</h3>
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