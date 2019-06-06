import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Dropdown } from 'react-bootstrap';
import './MiPerfil.css'
import firebase from '../config/config';

export default class Precios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoChofer: {},
            pedidos: [],
        };

        this.mostrarPedidos = this.mostrarPedidos.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/chofer').once('value').then((snap) => {
                const choferlist = snap.val();
                let infoChofer;
                choferlist.forEach((chofer, index) => {
                    if (chofer.correo === user.email) {
                        chofer.index = index;
                        infoChofer = chofer;
                    }
                });
                return infoChofer;
            });

            const pedidos = await firebase.database().ref('/pedido').once('value').then(snap => snap.val());

            this.setState({
                infoChofer: info,
                pedidos,
            });
        }
    }

    mostrarPedidos() {
        const { pedidos, infoChofer } = this.state;

        const pedidosJSX = [];

        pedidos.forEach((pedido, index) => {
            if (pedido.idchofer === infoChofer.identidad) {
                const { color, destino, estado, fecha, hora, marca, nombre, placa, telefono, ubicacion } = pedido;
                pedidosJSX.push(
                    <tr key={index}>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id={`dropdown-${index}`}>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => console.log('Estoy en camino')}>Estoy en camino</Dropdown.Item>
                                    <Dropdown.Item onClick={() => console.log('Estoy cerca')}>Estoy cerca</Dropdown.Item>
                                    <Dropdown.Item onClick={() => console.log('Ya llegue')}>Ya llegue</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
                        <td>{estado}</td>
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
                                    <th>Estado</th>
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