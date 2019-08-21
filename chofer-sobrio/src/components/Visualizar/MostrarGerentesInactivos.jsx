import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button, } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarGerenteInactivo extends Component {

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
        this.activar = this.activar.bind(this);
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
            if (index !== 0  && gerentes[key].estado =="inactivo") {
                pedido.accion = <Button variant="success" onClick={() => this.activar(key)}>Activar</Button>;
                dueños.push(pedido);                
            }
        })

        return dueños;
    }


    activar(keyPedido) {
        if (window.confirm(' Esta seguro que desea activar esta cuenta?')) {
            const database = firebase.database();
            const { gerentes } = this.state;
            const gerentesRes = gerentes.map(a => Object.assign({}, a));
            delete gerentesRes[keyPedido].accion;
            var estadocuenta = "activo"
            database.ref('gerente/' + keyPedido).update({
               estado:estadocuenta
            });
        }
     
    }

    render() {
        const pedidos = this.mostrargerentes();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>gerente Sobrio</h1>
                    <h5>Visualizar Gerentes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Gerentes Inactivos</h3>
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