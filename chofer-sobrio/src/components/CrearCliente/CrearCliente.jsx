import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import './CrearCliente.css'
import Crear from '../Crear_C_G_C/Crear';

export default class Precios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Color: '',
            Marca: '',
            nombre: '',
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
        var length_placa = this.state.Placa.length;
        var placa_cadena = this.state.Placa;
        var rex = /[a-z][a-z][a-z][0-9][0-9][0-9][0-9]+/i;
        if (form.checkValidity() === false) {
           
            this.setState({ validated: 'false' });

            event.preventDefault();
            
            event.stopPropagation();
        } else {
            if(length !==8 ){
                
                this.setState({telefono: ''});
                document.getElementById("telefono").value = "";
                
            }
            if (placa_cadena.length === 7 && placa_cadena.match(rex) !== null ) {

                if (length === 8) {
                    this.setState({ validated: 'true' });
                    event.preventDefault();
                    this.setState({ listo: 'true' });
                    event.preventDefault();
                    
                } else {
                    
                    this.setState({ validated: 'false' });
                    event.preventDefault();
            
                    
                }


            } else {
               
                this.setState({Placa: ''});
                document.getElementById("Placa").value = "";
                this.setState({ validated: 'false' });

                event.preventDefault();
            }
        }
        event.preventDefault();
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
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese el color de vehiculo
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
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la marca de vehiculo
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
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Nombre
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
                                            Ingrese su numero de placa
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
                                        Ingrese su Telefono
                            </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>
                            <div class="text-center">
                                <Button type="submit" variant="warning" >Crear</Button>
                                <Crear validado={ this.state.listo } datos={ [this.state.Color, this.state.Marca, this.state.nombre, this.state.Placa, this.state.telefono] } funcion={ "crear_cliente" } />
                                
                                </div>
                        </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}