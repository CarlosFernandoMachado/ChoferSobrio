import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import './CrearCliente.css'
import { Link } from 'react-router-dom';
import Home from '../Home/Home'
import Crear from '../Crear_C_G_C/Crear';

export default class Precios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Color: '',
            Marca: '',
            nombre: '',
            correo: '',
            Placa: 0,
            telefono: 0,
            validated: '',
            listo: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
        var placa_cadena = this.state.Placa;
        var rex = /[a-z][a-z][a-z][0-9][0-9][0-9][0-9]+/i;
        if (length !== 8) {

            this.setState({ telefono: '' });
            document.getElementById("telefono").value = "";

        }
        if (placa_cadena.length !== 7 || placa_cadena.match(rex) == null) {

            this.setState({ Placa: '' });
            document.getElementById("Placa").value = "";
        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre)) {
            /*Caracteres especiales*/
            this.setState({ nombre: '' });
            document.getElementById("nombre").value = "";

        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.Marca)) {
            /*Caracteres especiales*/
            this.setState({ Marca: '' });
            document.getElementById("Marca").value = "";

        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.Color)) {
            /*Caracteres especiales*/
            this.setState({ Color: '' });
            document.getElementById("Color").value = "";

        }
        if (form.checkValidity() === false) {

            this.setState({ validated: 'false' });

            event.preventDefault();

            event.stopPropagation();
        } else {
            this.setState({ validated: 'true' });
            event.preventDefault();
            this.setState({ listo: 'true' });
            event.preventDefault();

        }


        event.preventDefault();
    }
    limpiar(event) {
        this.setState({ telefono: '' });
        document.getElementById("telefono").value = "";
        this.setState({ Placa: '' });
        document.getElementById("Placa").value = "";
        this.setState({ nombre: '' });
        document.getElementById("nombre").value = "";
        this.setState({ Marca: '' });
        document.getElementById("Marca").value = "";
        this.setState({ Color: '' });
        document.getElementById("Color").value = "";

    }
    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvenidos a chofer Sobrio</h2>
                    <p>Esta es la pagina para crear Cliente?</p>
                </Jumbotron>
                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            noValidate
                            validated={ validated }
                            onSubmit={ e => this.handleSubmit(e) }
                             
                            

                        >
                            <Form.Row>
                                <Form.Group as={ Col } md="4" controlId="validationCustom01">
                                    <Form.Label>Color de Vehiculo</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="Color"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                        id="Color"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese el color de vehiculo (A-Z)
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom02">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                        placeholder=""
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Correo Correctamente (correo@ejemplo.com)
                        </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom01">
                                    <Form.Label>Marca de Vehiculo</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="Marca"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                        id="Marca"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la marca de vehiculo (A-Z)
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom01">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="nombre"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                        id="nombre"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Nombre (A-Z)
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustomID">
                                    <Form.Label>Placa</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="_ _ _ _ _ _ _"
                                            required
                                            name="Placa"
                                            value={ this.state.value }
                                            onChange={ this.handleChange }
                                            id="Placa"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Numero de placa invalido 3 letras (A-Z) y 4 digitos(0-9)
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom02">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="telefono"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                        id="telefono"

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Numero de telefono invalido siga el formato indicado 8 digitos numericos
                            </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>
                            <div class="text-center">
                            <Button type="submit" variant="warning" > Registrarse</Button>
                            <Crear validado={ this.state.listo } datos={ [this.state.Color, this.state.Marca, this.state.nombre, this.state.Placa, this.state.telefono, this.state.correo] } funcion={ "crear_cliente" }  />
                            
                           
                            </div>


                        </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}