import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker"
import TimePicker from 'react-time-picker';
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert, Dropdown } from 'react-bootstrap';
import es from 'date-fns/locale/es';
import './ModificarChofer.css';
import { th } from 'date-fns/esm/locale';

registerLocale('es', es);
setDefaultLocale('es');

export default class ModificarChofer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            identidad: '',
            id:0,
            correo: '',
            validated: '',
            listo: 0,
            infoCliente: {},
            
        };

        this.onChange = hora => this.setState({ hora });
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectMarca = this.handleSelectMarca.bind(this);
        
    }

    async componentDidMount(){
        
        const user = JSON.parse(localStorage.getItem('user'));
        this.getLocation();
        var cont = 0;
        if (user) {

            var rootRef = firebase.database().ref().child("chofer");
            rootRef.on("child_added", snap => {
                var id = 0
                var nombre = snap.child("nombre").val();
                var identidad = snap.child("identidad").val();
                var telefono = snap.child("telefono").val();
                var correo = snap.child("correo").val();
               

                if (correo == user.email) {
                    firebase.database().ref().child('chofer').orderByChild('correo').equalTo(user.email).on("value", function(snapshot) {
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
                       identidad:identidad
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

        if(date.getDate() == new Date().getDate()) {
            alert(date.getDate())
            this.setState({
                cambiarHora: new Date()
            });
        }else{
            alert(date.getDate())
            this.setState({
                cambiarHora: '00:00'
            });
        }

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
        if (length !== 8) {

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
           
            this.setState({ validated: 'true' });
            event.preventDefault();
            this.setState({ listo: 'true' });



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
                    <h5>Modifica tus datos</h5>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="nombre"
                                        value={this.state.nombre}
                                        onChange={this.handleChange}
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
                                <Form.Group as={Col} md="4">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9-]+)*$"
                                    name="correo"
                                    value={this.state.correo}
                                    onChange={this.handleChange}
                                    id="correo"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese su correo
                            </Form.Control.Feedback>
                            </Form.Group>
                            
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="telefono"
                                        value={this.state.telefono}
                                        onChange={this.handleChange}
                                        id="telefono"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su teléfono(8 digitos)
                            </Form.Control.Feedback>
                                </Form.Group>
                               
                              
                          
                            </Form.Row>
                            <Form.Row>
                               
                            </Form.Row>
                            <Form.Row>
                               
                                
                            </Form.Row>

                            <div className="text-center">
                                <Button type="submit" variant="warning" >Guardar
                                <Crear validado={this.state.listo} datos={[ this.state.identidad,this.state.nombre, this.state.telefono, this.state.correo,this.state.id]} funcion={"modificar_chofer"} />
                                </Button>

                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}