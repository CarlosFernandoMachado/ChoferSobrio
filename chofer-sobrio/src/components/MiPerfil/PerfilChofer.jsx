import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert} from 'react-bootstrap';
import firebase from '../config/config';
import './PerfilChofer.css';

export default class PerfilChofer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tiene: true,
            infoChofer: {},
            permisos: props.permisos,
        };
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const cliente = await firebase.database().ref('/cliente').once('value').then((snap) => {
                const clientes = snap.val();
                let cliente;
                Object.keys(clientes).forEach((key, index) => {
                    const tCliente = clientes[key];
                    if (tCliente.correo === user.email) {
                        tCliente.index = index;
                        cliente = tCliente;
                    }
                });
                return cliente;
            });

            const infoPedido = await firebase.database().ref('/pedido').once('value').then((snap) => {
                const pedidoList = snap.val();
                let infoPedido;
                Object.keys(pedidoList).forEach((key, index) => {
                    const pedido = pedidoList[key];
                    if (pedido.estado === 'Ocupado' && pedido.placa === cliente.placa) {
                        pedido.index = index;
                        infoPedido = pedido;
                    }
                });
                return infoPedido;
            });

            if (!infoPedido) {
                this.setState({ tiene: false });
            } else {
                const chofer = await firebase.database().ref('/chofer').once('value').then((snap) => {
                    const choferes = snap.val();
                    let chofer;
                    Object.keys(choferes).forEach((key, index) => {
                        const tChofer = choferes[key];
                        if (tChofer.identidad === infoPedido.idchofer) {
                            tChofer.index = index;
                            chofer = tChofer;
                        }
                    });
                    return chofer;
                });

                this.setState({
                    infoChofer: chofer,
                });
            }
        }
    }

    render() {
        const { tiene } = this.state;

        if (tiene) {
            const { correo, nombre, telefono } = this.state.infoChofer;

            return (
                <Container>
                    <Jumbotron className="jumbo-boy" fluid>
                        <h1>Chofer Sobrio</h1>
                        <h5>Perfil del Chofer</h5>
                    </Jumbotron>
                    <Card border="light">
                        <Alert variant="secondary">
                            <h3>Perfil</h3>
                            <br />
                            <h4><strong><u> Correo</u>:</strong> {correo}</h4>
                            <h4><strong><u>Nombre</u>: </strong>{nombre}</h4>
                            <h4><strong><u>Telefono</u>: </strong>{telefono}</h4>
                        </Alert>
                    </Card>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Jumbotron className="jumbo-boy" fluid>
                        <h1>Chofer Sobrio</h1>
                        <h5>Perfil del Chofer</h5>
                    </Jumbotron>
                    <Card border="light">
                        <Alert variant="secondary">
                            <h3>No tiene pedidos.</h3>
                        </Alert>
                    </Card>
                </Container>
            );
        }
    }
}
