import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button, } from 'react-bootstrap';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarGerente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoGerente: {},
            gerentes: [],
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
        const { gerentes, infoGerente } = this.state;

        const gerentesJSX = [];

        Object.keys(gerentes).forEach((key, index) => {
            const pedido = gerentes[key];
            if (index !== 0) {
                const { nombre, correo, telefono, identidad } = pedido;
                gerentesJSX.push(
                    <tr key={index}>
                        <td>{nombre}</td>
                        <td>{telefono}</td>
                        <td>{correo}</td>
                        <td>{identidad}</td>
                        <td>
                            <Button variant="danger" onClick={() => this.eliminar(key)}>Eliminar</Button>
                        </td>
                    </tr>
                );
            }
        })

        return gerentesJSX;
    }


    eliminar(keyPedido) {
        if (window.confirm(' Se eliminara la cuenta')) {
            const database = firebase.database();
            const { gerentes } = this.state;
            const gerentesRes = gerentes.map(a => Object.assign({}, a));
            database.ref(`gerente/${keyPedido}/`).remove();
        }
    }

    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>gerente Sobrio</h1>
                    <h5>Visualizar Gerente</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Identidad</th>
                                </tr>
                            </thead>
                            <tbody id="table_body">
                                {this.mostrargerentes()}
                            </tbody>
                        </Table>
                    </Alert>
                </Card>
            </Container>
        )
    }
}