import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert } from 'react-bootstrap';
import { CardBody, Card as CardStrap, CardTitle } from 'reactstrap';
import { Form, Button } from 'react-bootstrap';

import firebase from '../config/config';
import './PerfilChofer.css';

export default class PerfilChofer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tiene: true,
            infoChofer: {},
            permisos: props.permisos,
            id:0
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
    RechazarChofer(){
        
        const user = JSON.parse(localStorage.getItem('user'));

        var rootRef = firebase.database().ref().child("pedido");
        rootRef.on("child_added", snap => {
            var id = 0

            var correo = snap.child("correo").val();


            if (correo === user.email) {
                firebase.database().ref().child('pedido').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                    firebase.database().ref().child('pedido').orderByChild('estado').equalTo('Ocupado').on("value", function (snapshot) {
                        console.log(snapshot.val());
                        snapshot.forEach(function (data) {
                            id = data.key;
    
                        });
                    });
                });

                
               
                var database = firebase.database();
                database.ref('pedido/' + id ).update({
                    estado: 'Disponible',
                    correo_chofer: '',
                    idchofer:''
                   
                });
                setTimeout( window.location = "/",1000)

            }

        });
        

       
       
       
    }

    render() {
        const { tiene, infoChofer } = this.state;

        const imagen = infoChofer.imagen ? (
            <img className="rounded-circle mx-auto d-block" width="20%" src={infoChofer.imagen} alt="Foto de perfil" />
        ) : null;

        if (tiene && infoChofer) {
            const { correo, nombre, telefono } = infoChofer;

            return (
                <Container>
                    <Jumbotron className="jumbo-boy" fluid>
                        <h1>Chofer Sobrio</h1>
                        <h5>Perfil del Chofer</h5>
                    </Jumbotron>

                    <Card>
                        <Card.Header as="h5">Perfil</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {imagen}
                                <p><br></br></p>
                                <center>
                                    <h><b>Correo:</b></h>
                                    <p>{correo}</p>

                                    <br></br>
                                    <h><b>Nombre:</b></h>
                                    <p>{nombre}</p>

                                    <br></br>
                                    <h><b>Telefono:</b></h>
                                    <p>{telefono}</p>
                                </center>
                            </Card.Text>

                        </Card.Body>
                        <Button type="submit" variant="danger"  onClick={this.RechazarChofer}>Rechazar Chofer 

                        </Button>

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


