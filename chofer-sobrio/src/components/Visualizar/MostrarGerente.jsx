import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button, } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarGerente extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 300,
        }, {
            Header: 'Identidad',
            accessor: 'identidad',
            maxWidth: 150,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 150,
        },{
            Header: 'Telefono 2',
            accessor: 'telefono2',
            maxWidth: 300,
        }, {
            Header: 'Telefono 3 ',
            accessor: 'telefono3',
            maxWidth: 300,
        }, {
            Header: 'Correo',
            accessor: 'correo',
            maxWidth: 300,
        },{
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 100,
            filterable: false,
        }];

        this.state = {
            infoGerente: {},
            gerentes: [],
            permisos: props.permisos,
        };

        this.mostrargerentes = this.mostrargerentes.bind(this);
        this.eliminar = this.eliminar.bind(this);
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

            // gerentes
            this.dbRefGerente = firebase.database().ref('/gerente');
            this.dbCallbackGerente = this.dbRefGerente.on('value', snap => this.setState({ gerentes: snap.val() }));

            this.setState({
                infoGerente: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefGerente.off('value', this.dbCallbackGerente);
        }
    }

    mostrargerentes() {
        const { gerentes } = this.state;

        const dueños = [];

        Object.keys(gerentes).forEach((key, index) => {
            const pedido = gerentes[key];
            if (index !== 0) {
                pedido.accion = <Button variant="danger" onClick={() => this.eliminar(key)}>Eliminar</Button>;
                dueños.push(pedido);                
            }
        })

        return dueños;
    }


    eliminar(keyPedido) {
        if (window.confirm(' Se eliminara la cuenta')) {
            const database = firebase.database();
            const { gerentes } = this.state;
            const gerentesRes = gerentes.map(a => Object.assign({}, a));
            delete gerentesRes[keyPedido].accion;
            var estadocuenta = "inactivo"
            database.ref('gerente/' + keyPedido).update({
               estado:estadocuenta
            });
        }
        window.location = "/";
    }

    render() {
        const pedidos = this.mostrargerentes();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>gerente Sobrio</h1>
                    <h5>Visualizar Gerente</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Gerentes Existentes</h3>
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