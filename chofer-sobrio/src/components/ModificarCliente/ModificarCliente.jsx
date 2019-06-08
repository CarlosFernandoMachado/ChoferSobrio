import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker"
import TimePicker from 'react-time-picker';
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert, Dropdown } from 'react-bootstrap';
import es from 'date-fns/locale/es';
import './ModificarCliente.css';
import { th } from 'date-fns/esm/locale';

registerLocale('es', es);
setDefaultLocale('es');

export default class ModificarCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            color: '',
            marca: '',
            nombre: '',
            correo: '',
            placa: 0,
            telefono: 0,
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
    async componentDidMount() {
        console.log ("se hace loco")
        const user = JSON.parse(localStorage.getItem('user'));
        this.getLocation();
        var cont = 0;
        if (user) {

            var rootRef = firebase.database().ref().child("cliente");
            rootRef.on("child_added", snap => {
                var id = "1"
                var nombre = snap.child("nombre").val();
                var marca = snap.child("marca").val();
                var telefono = snap.child("telefono").val();
                var correo = snap.child("correo").val();
                var color = snap.child("color_vehiculo").val();
                var placa = snap.child("placa").val();

                if (correo == user.email) {
                    firebase.database().ref().child('cliente').orderByChild('correo').equalTo(user.email).on("value", function(snapshot) {
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
                        marca: marca,
                        color: color,
                        placa: placa,
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

    handleSelect(evtKey) {
        this.setState({ color: evtKey });
    }

    handleSelectMarca(evtKey) {
        this.setState({ marca: evtKey });
    }


   
    handleSubmit(event) {
      
        const form = event.currentTarget;
        var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
        var placa_cadena = this.state.placa;
        var rex = /[a-z][a-z][a-z][0-9][0-9][0-9][0-9]+/i;
        if (length !== 8) {

            this.setState({ telefono: '' });
            document.getElementById("telefono").value = "";

        }
        if (placa_cadena.length !== 7 || placa_cadena.match(rex) == null) {
            alert("error")
            this.setState({ placa: '' });
            document.getElementById("placa").value = "";
        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre)) {
            /*Caracteres especiales*/
            this.setState({ nombre: '' });
            document.getElementById("nombre").value = "";

        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.marca)) {
            /*Caracteres especiales*/
            this.setState({ marca: '' });
            document.getElementById("marca").value = "";

        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.color)) {
            /*Caracteres especiales*/
            this.setState({ color: '' });
            document.getElementById("color").value = "";

        }
        alert(form.checkValidity())
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

                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9-]+)*$"
                                        name="correo"
                                        value={ this.state.correo }
                                        onChange={ this.handleChange }
                                        id="correo"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su correo
                            </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="telefono"
                                        value={ this.state.telefono }
                                        onChange={ this.handleChange }
                                        id="telefono"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su teléfono(8 digitos)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Marca</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                            { this.state.marca }
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey='BMW' onSelect={ this.handleSelect }>
                                                BMW
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Chevrolet' onSelect={ this.handleSelectMarca }>
                                                Chevrolet
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Ferrari' onSelect={ this.handleSelectMarca }>
                                                Ferrari
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Ford' onSelect={ this.handleSelectMarca }>
                                                Ford
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey='Honda' onSelect={ this.handleSelectMarca }>
                                                Honda
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Hyundai' onSelect={ this.handleSelectMarca }>
                                                Hyundai
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Isuzu' onSelect={ this.handleSelectMarca }>
                                                Isuzu
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Jaguar' onSelect={ this.handleSelectMarca }>
                                                Jaguar
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Kia' onSelect={ this.handleSelectMarca }>
                                                Kia
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Land Rover' onSelect={ this.handleSelectMarca }>
                                                Land Rover
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Mazda' onSelect={ this.handleSelectMarca }>
                                                Mazda
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Mercedes Benz' onSelect={ this.handleSelectMarca }>
                                                Mercedes Benz
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Mitsubishi' onSelect={ this.handleSelectMarca }>
                                                Mitsubishi
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Nissan' onSelect={ this.handleSelectMarca }>
                                                Nissan
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Range Rover' onSelect={ this.handleSelectMarca }>
                                                Range Rover
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Renault' onSelect={ this.handleSelectMarca }>
                                                Renault
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Suzuki' onSelect={ this.handleSelectMarca }>
                                                Suzuki
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Toyota'>
                                                Toyota
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Volkswagen' onSelect={ this.handleSelectMarca }>
                                                Volkswagen
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Volvo' onSelect={ this.handleSelectMarca }>
                                                Volvo
                                             </Dropdown.Item>
                                            <Form.Label>Otra marca:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="marca"
                                                value={ this.state.value }
                                                onChange={ this.handleChange }
                                                placeholder="Ingrese la marca del vehículo"
                                                id="marcaField"
                                                bsRole="toggle"
                                            />
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Form.Group>
                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Placa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="placa"
                                        value={ this.state.placa }
                                        onChange={ this.handleChange }
                                        id="placa"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la placa de su vehiculo
                        </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Color</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                            { this.state.color }
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey='Amarillo'>
                                                Amarillo
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Azul' onSelect={ this.handleSelect }>
                                                Azul
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Blanco' onSelect={ this.handleSelect }>
                                                Blanco
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Dorado' onSelect={ this.handleSelect }>
                                                Dorado
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Gris' onSelect={ this.handleSelect }>
                                                Gris
                                        </Dropdown.Item>
                                            <Dropdown.Item eventKey='Negro' onSelect={ this.handleSelect }>
                                                Negro
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Ocre' onSelect={ this.handleSelect }>
                                                Ocre
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Plateado' onSelect={ this.handleSelect }>
                                                Plateado
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Rojo' onSelect={ this.handleSelect }>
                                                Rojo
                                         </Dropdown.Item>
                                            <Dropdown.Item eventKey='Verde' onSelect={ this.handleSelect }>
                                                Verde
                                         </Dropdown.Item>
                                            <Form.Label>Otro color:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="color"
                                                value={ this.state.value }
                                                onChange={ this.handleChange }
                                                placeholder="Ingrese el color del vehículo"
                                                id="colorField"
                                                bsRole="toggle"
                                            />
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                            </Form.Row>
                            <Form.Row>


                            </Form.Row>

                            <div className="text-center">
                                <Button type="submit" variant="warning" >Guardar
                                
                                <Crear validado={ this.state.listo } datos={ [this.state.color, this.state.marca, this.state.nombre, this.state.placa, this.state.telefono, this.state.correo, this.state.id] } funcion={ "modificar_cliente" } />
                                </Button>

                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}