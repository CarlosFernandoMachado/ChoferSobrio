import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Form, Button, Col, InputGroup } from 'react-bootstrap';
import './Visualizar.css'
import firebase from '../config/config';
import Crear from '../Crear_C_G_C/Crear';

export default class VisualizarCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            correo: '',
            listo: 0,
            validated: 0,
            informacion: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loaddata();
    }
    componentWillUnmount() {
        document.getElementById('table_body').innerHTML = '';
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {

        const user = JSON.parse(localStorage.getItem('user'));
        var password = this.state.password;
        var rootRef = firebase.database().ref().child("cliente");
        rootRef.on("child_added", snap => {
            var id = 0

            var correo = snap.child("correo").val();


            firebase.database().ref().child('cliente').orderByChild('correo').equalTo(this.state.correo).on("value", function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(data) {
                    id = data.key;

                });
            });

            this.setState({
                id: id,

            });
            event.preventDefault();



        });

        if (window.confirm(' Se eliminara la cuenta')) {
            this.setState({ listo: "true" });
        }
    }



    loaddata = () => {
        var rootRef = firebase.database().ref().child("cliente");
        rootRef.on("child_added", snap => {

            var nombre = snap.child("nombre").val();
            var telefono = snap.child("telefono").val();
            var correo = snap.child("correo").val();
            var placa = snap.child("placa").val();
            var marca = snap.child("marca").val();
            var color = snap.child("color").val();
            //en var eliminar @Jean agregara el nodo superior para poder eliminar al usuario
            var eliminar;
            //
            var data = [];
            data.push(nombre);
            data.push(telefono);
            data.push(correo);
            data.push(placa);
            data.push(marca);
            data.push(color);
            var tr = document.createElement("tr");
            /* just in case lo arruine todo
            for (var i = 0; i < data.length; i++) {
                var td = document.createElement("td");

                td.textContent = data[i];
                tr.appendChild(td);
            }*/
            for (var i = 0; i < data.length; i++) {
                var td = document.createElement("td");
                var button = document.createElement("p");
                button.innerHTML = "<input class='btn btn-primary' type='submit' value='Eliminar'></input>";
                td.appendChild(button);
                td.textContent = data[i];
                tr.appendChild(td);
            }
            var tabla = document.getElementById("table_body");
            tabla.appendChild(tr);

        });
    };
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
                            </tbody>
                        </Table>
                        <Form

                        onSubmit={ e => this.handleSubmit(e) }>
                        <Form.Row>
                            <Form.Group as={ Col } md="4" controlId="validationCustomID">
                                <Form.Label>Correo</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        required
                                        name="correo"
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9-]+)*$"
                                        id="correo"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Correo Correctamente (correo@gmail.com)
                </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <div className="text-center">
                            <Button type="submit" variant="warning" >Eliminar Cliente
                        <Crear validado={ this.state.listo } datos={ [this.state.id] } funcion={ "eliminar_cliente" } />
                            </Button>

                        </div>

                    </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}