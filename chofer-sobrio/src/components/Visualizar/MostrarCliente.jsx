import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Form, Button, Col, InputGroup } from 'react-bootstrap';
import './Visualizar.css'
import firebase from '../config/config';
import Crear from '../Crear_C_G_C/Crear';

export default class VisualizarCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
           clientes:[],
           infocliente:{}
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
        const { clientes, infocliente } = this.state;

        const clientesJSX = [];

        Object.keys(clientes).forEach((key, index) => {
            const pedido = clientes[key];
            if (index !== 0) {


                const { nombre, correo, telefono, marca, color_vehiculo,placa } = pedido;


                clientesJSX.push(
                    <tr key={index}>
                        <td>{nombre}</td>
                        <td>{telefono}</td>
                        <td>{correo}</td>
                        <td>{marca}</td>
                        <td>{color_vehiculo}</td>
                        <td>{placa}</td>
                        
                        <td>
                            <Button variant="danger" onClick={() => this.eliminar(key)}>Eliminar</Button>
                        </td>
                    </tr>
                );
            }
        })

        return clientesJSX;
    }


    eliminar(keyPedido) {
        if (window.confirm(' Se eliminara la cuenta')) {


            const database = firebase.database();
            const { clientes } = this.state;

            const clientesRes = clientes.map(a => Object.assign({}, a));
            database.ref(`cliente/${keyPedido}/`).remove();
            var correo = this.state.infocliente.correo;
            var id = 0;
        }
    }

   
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Datos de los Clientes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Placa</th>
                                    <th>Marca</th>
                                    <th>Color</th>
                                    
                                </tr>
                            </thead>
                            <tbody id="table_body">
                            {this.mostrarclientes()}
                            </tbody>
                        </Table>
                       
                    </Alert>
                </Card>
            </Container>
        )
    }
}