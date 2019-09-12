import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import './CrearChofer.css'
import Crear from '../Crear_C_G_C/Crear';
import Fire from '../config/config';

export default class CrearChofer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            identidad: '',
            correo: '',
            validated: '',
            listo: 0,
            telefono2:'',
            telefono3:''
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
        var lengthID = this.state.identidad.length
        var estado = 0;
        var estado2 = 0;
        var estadoc = 0;
        var that = this;

        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre)) {
            /*Caracteres especiales*/
            this.setState({ nombre: '' });
            document.getElementById("nombre").value = "";
            
        }
        if (length !== 8  || !/^[8-9372][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$/.test(this.state.telefono)) {

            this.setState({ telefono: '' });
            document.getElementById("telefono").value = "";

        }
        if (lengthID !== 13) {
            
            this.setState({ identidad: '' });
            document.getElementById("identidad").value = "";

        }
        if (form.checkValidity() === false) {
            this.setState({ validated: 'false' })
            event.preventDefault();
            event.stopPropagation();

        } else {
           
            Fire.database().ref('chofer').orderByChild('identidad').equalTo(this.state.identidad).once('value').then(function (snapshot) {
                estado2 = snapshot.exists()
                Fire.database().ref('chofer').orderByChild('correo').equalTo(that.state.correo).once('value').then(function (snapshot) {
                    estadoc = snapshot.exists()
                    Fire.database().ref('chofer').orderByChild('telefono').equalTo(that.state.telefono).once('value').then(function (snapshot) {
                        estado = snapshot.exists()
                        if (estado==true){
                            alert("El telefono que ha ingresado ya esta registrado en nuestro sistema, intente de nuevo.")
                            that.setState({ telefono: '' });
                            document.getElementById("telefono").value = "";
                            that.setState({ validated: 'false' });
                        }
                       else if (estadoc==true){
                            alert("El correo que ha ingresado ya esta registrado en nuestro sistema, intente de nuevo.")
                            that.setState({ correo: '' });
                            document.getElementById("correo").value = "";
                            that.setState({ validated: 'false' });
                        }
                        else if (estado2==true){
                            alert("La identidad que ha ingresado ya esta registrada en nuestro sistema, intente de nuevo.")
                            that.setState({ identidad: '' });
                            document.getElementById("identidad").value = "";
                            that.setState({ validated: 'false' });
                        }else{
                            that.setState({ validated: 'true' });
                            event.preventDefault();
                            that.setState({ listo: 'true' });
                        }
            
                    })
        
                })
                
            });



        }
        this.setState({ validated: 'false' });
        event.preventDefault();
    }
    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Registra a un nuevo chofer</h5>
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
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su nombre Correctamente (A-Z)
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom02">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        id="telefono"
                                        name="telefono"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Telefono Correctamente 8 digitos (0-9)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom02">
                                    <Form.Label>Telefono 2 (Opcional)</Form.Label>
                                    <Form.Control
                                        
                                        type="number"
                                        id="telefono2"
                                        name="telefono2"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Telefono Correctamente 8 digitos (0-9)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom02">
                                    <Form.Label>Telefono 3 (Opcional)</Form.Label>
                                    <Form.Control
                                      
                                        type="number"
                                        id="telefono3"
                                        name="telefono3"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Telefono Correctamente 8 digitos (0-9)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustomID">
                                    <Form.Label>Identidad</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            id="identidad"
                                            placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _"
                                            required
                                            name="identidad"
                                            value={ this.state.value }
                                            onChange={ this.handleChange }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese su Identidad Correctamente 13 digitos (0-9)
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom02">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9-]+)*$"
                                        placeholder="ejempl0@correo.com"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Correo Correctamente (correo@correo.com)                           </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <div class="text-center">
                                <Button type="submit" variant="warning" >Crear chofer</Button>
                                <Crear validado={ this.state.listo } datos={ [this.state.identidad, this.state.nombre, this.state.telefono, this.state.correo,this.state.telefono2,this.state.telefono3] } funcion={ "crear_chofer" } />
                            </div>
                        </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}