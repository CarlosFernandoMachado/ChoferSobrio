import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert, Dropdown } from 'react-bootstrap';
import './PedirChofer.css'

export default class Precios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            marca: '',
            color: '',
            placa: '',
            ubicacion_actual: '',
            destino: '',
            fecha: new Date(),
            hora: '9:00',
            validated: '',
            date: '',
            listo: 0,
            infoCliente: {},
        };

        this.onChange = hora => this.setState({ hora });
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // clientes
            const info = await firebase.database().ref('/cliente').once('value').then((snap) => {
                const clientes = snap.val();
                let infoCliente;
                clientes.forEach(cliente => {
                    if (cliente.correo === user.email) {
                        infoCliente = cliente;
                    }
                });
                return infoCliente;
            });

            console.log(info);

            this.setState({
                nombre: info.nombre,
                telefono: info.telefono,
                marca: info.marca,
                color: info.color_vehiculo,
                placa: info.placa,
            });
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    dateChange(date) {
        this.setState({
            fecha: date
        });

    }

    handleSelect(evtKey){
        this.setState({ color: evtKey });
    }


    handleSubmit(event) {
        const form = event.currentTarget;
        this.setState({ date: (this.state.fecha.getDate() + '/' + (this.state.fecha.getMonth() + 1) + '/' + this.state.fecha.getFullYear()) });


        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ listo: 'false' });
        } else {
            var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
            /*VALIDACIONES*/
            if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre)) {
                /*Caracteres especiales*/
                this.setState({ nombre: '' });
                document.getElementById("nombre").value = "";
                this.setState({ validated: 'false' });
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.marca)) {
                /*Caracteres especiales*/
                this.setState({ marca: '' });
                document.getElementById("marca").value = "";
                this.setState({ validated: 'false' });
            }else if (this.state.placa.length != 7 || !/^[a-z][a-z][a-z][0-9][0-9][0-9][0-9]+/i.test(this.state.placa)) {
                /*Placa invalida*/
                this.setState({ placa: '' });
                document.getElementById("placa").value = "";
                this.setState({ validated: 'false' });
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.destino)) {
                /*Caracteres especiales*/
                this.setState({ destino: '' });
                document.getElementById("destino").value = "";
                this.setState({ validated: 'false' });
            } else if (length != 8 || !/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$/.test(this.state.telefono)) {
                this.setState({ telefono: '' });
                document.getElementById("telefono").value = "";
                this.setState({ validated: 'false' });
            } else if (this.state.validated) {
                 alert("Pedido realizado");
                this.setState({ validated: 'false' });
                event.preventDefault();
                this.setState({ listo: 'true' });
            }
        }
        event.preventDefault();
    }

    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvenidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina para pedir chofer!</p>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}
                        >
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
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Marca</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            required
                                            name="marca"
                                            value={this.state.marca}
                                            onChange={this.handleChange}
                                            id="marca"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese la marca de su vehiculo
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Placa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="placa"
                                        value={this.state.placa}
                                        onChange={this.handleChange}
                                        id="placa"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la placa de su vehiculo
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Destino</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="destino"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        id="destino"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su destino
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Color</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                             Seleccione un color..
                                        </Dropdown.Toggle>

                                         <Dropdown.Menu>
                                             <Dropdown.Item eventKey = 'Amarillo'  onSelect={this.handleSelect}>
                                                 Amarillo
                                             </Dropdown.Item>
                                             <Dropdown.Item eventKey = 'Azul'  onSelect={this.handleSelect}>
                                                 Azul
                                             </Dropdown.Item>
                                             <Dropdown.Item eventKey = 'Blanco'  onSelect={this.handleSelect}>
                                                 Blanco
                                             </Dropdown.Item>
                                             <Dropdown.Item eventKey = 'Dorado'  onSelect={this.handleSelect}>
                                                 Dorado
                                             </Dropdown.Item>
                                             <Dropdown.Item eventKey = 'Gris'  onSelect={this.handleSelect}>
                                                 Gris
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey = 'Negro'  onSelect={this.handleSelect}>
                                                 Negro
                                             </Dropdown.Item>
                                             <Dropdown.Item eventKey = 'Ocre'  onSelect={this.handleSelect}>
                                                 Ocre
                                             </Dropdown.Item>
                                             <Dropdown.Item eventKey = 'Plateado'  onSelect={this.handleSelect}>
                                                 Plateado
                                             </Dropdown.Item>
                                             <Dropdown.Item eventKey = 'Verde'  onSelect={this.handleSelect}>
                                                 Verde
                                             </Dropdown.Item>
                                             <Form.Label>Otro color:</Form.Label>
                                                 <Form.Control
                                                    type="text"
                                                    name="color"
                                                    value={this.state.value}
                                                    onChange={this.handleChange}
                                                    placeholder="Ingrese el color del vehículo"
                                                    id="colorField"                                                  
                                                    bsRole="toggle"
                                                 />                                           
                                         </Dropdown.Menu>
                                        </Dropdown>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Fecha</Form.Label>

                                    <DatePicker
                                        selected={this.state.fecha}
                                        onChange={this.dateChange}
                                        value={this.state.value}
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        withPortal
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Hora </Form.Label>
                                    <TimePicker
                                        onChange={this.onChange}
                                        name="hora"
                                        value={this.state.hora}
                                        format="hh:mm a"
                                        disableClock={true}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la hora
                            </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                          
                            <div className="text-center">                          
                                <Button type="submit" variant="warning" >Pedir chofer</Button>
                                <Crear validado={this.state.listo} datos={[this.state.color, this.state.destino, this.state.date, this.state.hora, this.state.marca, this.state.nombre, this.state.placa, this.state.telefono, "Ubicación"]} funcion={"Crearpedido"} />                          
                                
                            </div>
                        
                        </Form>
                    </Alert>
                </Card>

            </Container>
        )
        
    }
}