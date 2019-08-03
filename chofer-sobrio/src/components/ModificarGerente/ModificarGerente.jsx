import React, { Component } from 'react'
import { registerLocale, setDefaultLocale } from "react-datepicker"
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import es from 'date-fns/locale/es';
import './ModificarGerente.css';

registerLocale('es', es);
setDefaultLocale('es');

export default class ModificarGerente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            id: 0,
            identidad: '',
            correo: '',
            validated: '',
            listo: 0,
            infoCliente: {},
            telefono2:'',
            telefono3:''

        };

        this.onChange = hora => this.setState({ hora });
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectMarca = this.handleSelectMarca.bind(this);

    }

    async componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'));
        this.getLocation();
        var cont = 0;
        if (user) {

            var rootRef = firebase.database().ref().child("gerente");
            rootRef.on("child_added", snap => {
                var id = 0
                var nombre = snap.child("nombre").val();
                var identidad = snap.child("identidad").val();
                var telefono = snap.child("telefono").val();
                var correo = snap.child("correo").val();
                var telefono2 = snap.child("telefono2").val();
                var telefono3 = snap.child("telefono3").val();



                if (correo == user.email) {
                    firebase.database().ref().child('gerente').orderByChild('correo').equalTo(user.email).on("value", function(snapshot) {
                        console.log(snapshot.val());
                        snapshot.forEach(function(data) {
                            id = data.key;

                        });
                    });

                    this.setState({
                        id: id,
                        nombre: nombre,
                        correo: correo,
                        telefono: telefono,
                        identidad: identidad,
                        telefono2:telefono2,
                        telefono3:telefono3
                    });
                }

            });



        }

    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    showPosition = (position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var ubicacion = lat + "," + lon;
        this.setState({ ubicacion_actual: ubicacion });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    dateChange(date) {
        this.setState({
            fecha: date
        });

        if (date.getDate() == new Date().getDate()) {
            alert(date.getDate())
            this.setState({
                cambiarHora: new Date()
            });
        } else {
            alert(date.getDate())
            this.setState({
                cambiarHora: '00:00'
            });
        }

    }
    update_password = () => {
        const email = firebase.auth().currentUser.email;
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                alert('Se ha enviado un link de cambio de contrasena a ' + email);
            });
    }
    handleSelect(evtKey) {
        this.setState({ color: evtKey });
    }

    handleSelectMarca(evtKey) {
        this.setState({ marca: evtKey });
    }


    handleSubmit(event) {
        const form = event.currentTarget;
        var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
        var lengthID = this.state.identidad.length

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
            alert(lengthID)
            alert(length)
            this.setState({ identidad: '' });
            document.getElementById("identidad").value = "";

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
        event.preventDefault()


    }
    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Modifica tus datos</h5>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            noValidate
                            validated={ validated }
                            onSubmit={ e => this.handleSubmit(e) }>
                            <Form.Row>
                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="nombre"
                                        value={ this.state.nombre }
                                        onChange={ this.handleChange }
                                        id="nombre"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su nombre
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
                                            value={ this.state.identidad }
                                            onChange={ this.handleChange }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese su Identidad Correctamente 13 digitos (0-9)
                            </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="telefono"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={ this.state.telefono }
                                        onChange={ this.handleChange }
                                        id="telefono"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su teléfono(8 digitos)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Telefono 2 (Opcional)</Form.Label>
                                    <Form.Control
                                        
                                        type="number"
                                        name="telefono2"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={ this.state.telefono2 }
                                        onChange={ this.handleChange }
                                        id="telefono2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su teléfono(8 digitos)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Telefono 3 (Opcional)</Form.Label>
                                    <Form.Control
                                        
                                        type="number"
                                        name="telefono3"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={ this.state.telefono3 }
                                        onChange={ this.handleChange }
                                        id="telefono3"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su teléfono(8 digitos)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="3">
                                    <div className="text-left">
                                        <Button  type="submit" variant="danger" onClick={this.update_password}>Cambiar contraseña</Button>
                                    </div>  
                                </Form.Group>


                            </Form.Row>
                            <Form.Row>

                            </Form.Row>
                            <Form.Row>


                            </Form.Row>

                            <div className="text-center">
                                <Button type="submit" variant="warning" >Guardar
                                <Crear validado={ this.state.listo } datos={ [this.state.identidad, this.state.nombre, this.state.telefono, this.state.correo, this.state.id,this.state.telefono2,this.state.telefono3] } funcion={ "modificar_gerente" } />
                                </Button>

                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}