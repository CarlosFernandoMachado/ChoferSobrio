import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker"
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, Card, Alert, Dropdown } from 'react-bootstrap';
import es from 'date-fns/locale/es';
import './PedirChofer.css';
import swal from 'sweetalert';
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import { Link, Redirect } from 'react-router-dom';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import Fire from '../config/config';
import 'firebase/firestore';
import {messaging} from '../config/config';
registerLocale('es', es);
setDefaultLocale('es');

export default class PedirChofer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tienePedido: false,
            nombre: '',
            telefono: '',
            marca: 'Seleccione la marca de su vehículo.',
            color: 'Seleccione el color de su vehículo.',
            placa: '',
            ubicacion_actual: 'No la compartio',
            destino: '',
            fecha: new Date(),
            hora: '23:00',
            validated: '',
            date: '',
            isCliente: false,
            listo: 0,
            infoCliente: {},
            cambiarHora: new Date(),
            correo:"",
            pago: "tarjeta",
            paradasAdicionales:'0',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectMarca = this.handleSelectMarca.bind(this);
        this.handlePago = this.handlePago.bind(this);
        this.handleSelectParadas = this.handleSelectParadas.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        await messaging.requestPermission();
        const token = await messaging.getToken();
        
        console.log('token de usuario:', token);
        if(token){
            
           /* var database = Fire.database();
            var postsRef = database.ref().child("Tokens");
            var newPostRef = postsRef.set();
            newPostRef.set({
                correo: user.email,
                registro: token
              });*/
            var ref = Fire.database().ref().child('Tokens');
            var refTokenEmail = ref.orderByChild('correo').equalTo(user.email);
            refTokenEmail.once('value', function (snapshot) {
            if (snapshot.hasChildren()) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        correo: user.email,
                        registro: token
                      });
                });
            } else {
                snapshot.ref.push({
                    correo: user.email,
                    registro: token
                  });
            }
            });
        }else{

        }
        var lat = this.props.location.state.latitude;
        var lon = this.props.location.state.longitude;
        var ubicacion = lat + "," + lon;
        console.log('Ubicacion que reciber PEDIR CHOFER de HOME');
        console.log('Latitud: ' + lat + ', Longitud: ' + lon);
        this.setState({ ubicacion_actual: ubicacion });
        if (user) {
            // clientes
            const info = await firebase.database().ref('/cliente').once('value').then((snap) => {
                const clientes = snap.val();
                let infoCliente;
                Object.keys(clientes).forEach(key => {
                    const cliente = clientes[key];
                    if (cliente.correo === user.email) {
                        infoCliente = cliente;
                    }
                });
                return infoCliente;
            });

            // pedidos
            const tienePedido = await firebase.database().ref('/pedido').once('value').then(snap => {
                const pedidos = snap.val();
                let tienePedido = false;
                Object.keys(pedidos).forEach(key => {
                    const pedido = pedidos[key];
                    if (pedido.correo === user.email && (pedido.estado === 'Disponible' || pedido.estado === 'Ocupado')) {
                        tienePedido = true;
                    }
                });
                return tienePedido;
            });
            
            this.setState({
                tienePedido,
                nombre: info.nombre,
                telefono: info.telefono,
                marca: info.marca,
                color: info.color_vehiculo,
                placa: info.placa,
                correo:info.correo
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

        if (date.getDate() === new Date().getDate()) {
            this.setState({
                cambiarHora: new Date()
            });
        } else {
            this.state.cambiarHora.setHours('00');
            this.state.cambiarHora.setMinutes('00');
        }

    }

    handleSelect(evtKey) {
        this.setState({ color: evtKey });
    }

    handleSelectMarca(evtKey) {

        this.setState({ marca: evtKey });
    }

    handleSelectParadas(evtKey) {
        this.setState({ paradasAdicionales: evtKey});
    }

    handlePago(evtKey) {
        this.setState({ pago: evtKey});
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        this.setState({ date: (this.state.fecha.getDate() + '/' + (this.state.fecha.getMonth() + 1) + '/' + this.state.fecha.getFullYear()) });

        if (this.state.fecha.getHours() < 10 && this.state.fecha.getMinutes() < 10) {
            this.setState({ hora: ('0' + this.state.fecha.getHours() + ':0' + this.state.fecha.getMinutes()) });
        } else if (this.state.fecha.getMinutes() < 10) {
            this.setState({ hora: (this.state.fecha.getHours() + ':0' + this.state.fecha.getMinutes()) });
        } else if (this.state.fecha.getHours() < 10) {
            this.setState({ hora: ('0' + this.state.fecha.getHours() + ':' + this.state.fecha.getMinutes()) });
        } else {
            this.setState({ hora: (this.state.fecha.getHours() + ':' + this.state.fecha.getMinutes()) });
        }


        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        } else {
            var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
            /*VALIDACIONES*/
            if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre) || /^\s+$/.test(this.state.nombre)) {
                /*Caracteres especiales*/
                this.setState({ nombre: '' });
                document.getElementById("nombre").value = "";
                this.setState({ validated: 'false' });
            } else if (this.state.placa.length !== 7 || !/^[a+p+h+P+A+H][a-z+A-Z][a-z+A-Z][0-9][0-9][0-9][0-9]+$/.test(this.state.placa)) {
                /*Placa invalida*/
                this.setState({ placa: '' });
                document.getElementById("placa").value = "";
                this.setState({ validated: 'false' });
            } else if (!/^[a-z0-9A-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.destino) || /^\s+$/.test(this.state.destino)) {
                /*Caracteres especiales*/
                this.setState({ destino: '' });
                document.getElementById("destino").value = "";
                this.setState({ validated: 'false' });
            } else if (length !== 8 || !/^[8-9372][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$/.test(this.state.telefono)) {
                this.setState({ telefono: '' });
                document.getElementById("telefono").value = "";
                this.setState({ validated: 'false' });
            } else if (this.state.marca === 'Seleccione la marca de su vehículo.') {
                this.setState({ validated: 'false' });
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.marca) || /^\s+$/.test(this.state.marca)) {
                /*Caracteres especiales*/
                this.setState({ marca: 'Seleccione la marca de su vehículo.' });
                document.getElementById("marcaField").value = "";
                this.setState({ validated: 'false' });
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.color) || /^\s+$/.test(this.state.color)) {
                /*Caracteres especiales*/
                this.setState({ color: 'Seleccione el color de su vehículo.' });
                document.getElementById("colorField").value = "";
                this.setState({ validated: 'false' });
            } else if (this.state.color === 'Seleccione el color de su vehículo.') {
                this.setState({ validated: 'false' });
            } else {
               
                this.setState({ validated: 'true' });
                event.preventDefault();
                this.setState({ listo: 'true' });
            }
        }
        event.preventDefault();
        this.setState({ validated: 'false' });
    }

    render() {
        const { validated, tienePedido } = this.state;

        if (tienePedido) {
            return <Redirect to="/MisReservaciones"/>;
        }
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Haz tu reservación hoy</h5>
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
                                        Nombre inválido, siga el formato indicado(A-Z).
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="telefono"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={this.state.telefono}
                                        onChange={this.handleChange}
                                        id="telefono"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Número de teléfono inválido siga el formato indicado, 8 dígitos númericos(empezando por 3, 8 o 9).
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Marca</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                            {this.state.marca}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey='BMW' onSelect={this.handleSelectMarca}>
                                                BMW
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Chevrolet' onSelect={this.handleSelectMarca}>
                                                Chevrolet
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Ferrari' onSelect={this.handleSelectMarca}>
                                                Ferrari
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Ford' onSelect={this.handleSelectMarca}>
                                                Ford
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey='Honda' onSelect={this.handleSelectMarca}>
                                                Honda
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Hyundai' onSelect={this.handleSelectMarca}>
                                                Hyundai
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Isuzu' onSelect={this.handleSelectMarca}>
                                                Isuzu
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Jaguar' onSelect={this.handleSelectMarca}>
                                                Jaguar
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Kia' onSelect={this.handleSelectMarca}>
                                                Kia
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Land Rover' onSelect={this.handleSelectMarca}>
                                                Land Rover
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Mazda' onSelect={this.handleSelectMarca}>
                                                Mazda
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Mercedes Benz' onSelect={this.handleSelectMarca}>
                                                Mercedes Benz
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Mitsubishi' onSelect={this.handleSelectMarca}>
                                                Mitsubishi
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Nissan' onSelect={this.handleSelectMarca}>
                                                Nissan
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Range Rover' onSelect={this.handleSelectMarca}>
                                                Range Rover
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Renault' onSelect={this.handleSelectMarca}>
                                                Renault
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Suzuki' onSelect={this.handleSelectMarca}>
                                                Suzuki
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Toyota' onSelect={this.handleSelectMarca}>
                                                Toyota
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Volkswagen' onSelect={this.handleSelectMarca}>
                                                Volkswagen
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Volvo' onSelect={this.handleSelectMarca}>
                                                Volvo
                                             </Dropdown.Item>
                                            <Form.Label>Otra marca:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="marca"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                placeholder="Ingrese la marca del vehículo"
                                                id="marcaField"
                                                bsRole="toggle"
                                            />
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Placa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="placa"
                                        placeholder="_ _ _ _ _ _ _"
                                        value={this.state.placa}
                                        onChange={this.handleChange}
                                        id="placa"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Número de placa inválido 3 letras (a-z) y 4 digitos(0-9).
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
                                        Destino inválido.
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Color</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                            {this.state.color}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey='Amarillo' onSelect={this.handleSelect}>
                                                Amarillo
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Azul' onSelect={this.handleSelect}>
                                                Azul
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Blanco' onSelect={this.handleSelect}>
                                                Blanco
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Dorado' onSelect={this.handleSelect}>
                                                Dorado
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Gris' onSelect={this.handleSelect}>
                                                Gris
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey='Negro' onSelect={this.handleSelect}>
                                                Negro
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Ocre' onSelect={this.handleSelect}>
                                                Ocre
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Plateado' onSelect={this.handleSelect}>
                                                Plateado
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Rojo' onSelect={this.handleSelect}>
                                                Rojo
                                             </Dropdown.Item>
                                            <Dropdown.Item eventKey='Verde' onSelect={this.handleSelect}>
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
                                    <Form.Label>Fecha y Hora</Form.Label>

                                    <DatePicker
                                        selected={this.state.fecha}
                                        onChange={this.dateChange}
                                        minDate={new Date()}
                                        value={this.state.value}
                                        withPortal
                                        showTimeSelect
                                        timeIntervals={15}
                                        timeFormat="h:mm aa"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="Hora"
                                        minTime={setHours(setMinutes(new Date(), this.state.cambiarHora.getMinutes()), this.state.cambiarHora.getHours())}
                                        maxTime={setHours(setMinutes(new Date(), 59), 23)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                <Form.Label>Pago</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {this.state.pago}
                                        </Dropdown.Toggle>
                                        <DropdownMenu>
                                        <Dropdown.Item eventKey="tarjeta" onSelect={this.handlePago}>
                                            Tarjeta de Crédito / Débito
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="efectivo" onSelect={this.handlePago}>
                                            Efectivo   
                                        </Dropdown.Item>
                                        </DropdownMenu>
                                    </Dropdown>                                   
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                <Form.Label>Paradas Adicionales</Form.Label>
                                    <Dropdown>
                                    
                                        <Dropdown.Toggle  variant="light" id="dropdown-basic">
                                            {this.state.paradasAdicionales}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item eventKey='0' onSelect={this.handleSelectParadas}>
                                                0
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey='1' onSelect={this.handleSelectParadas}>
                                                1
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey='2' onSelect={this.handleSelectParadas}>
                                                2
                                            </Dropdown.Item>
                                            <Dropdown.Item  eventKey='3' onSelect={this.handleSelectParadas}>
                                                3
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="Servicio por noche" onSelect={this.handleSelectParadas}>
                                                Servicio por noche
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Pedir chofer
                                    <Crear validado={this.state.listo} datos={[this.state.color, this.state.destino, this.state.date, this.state.hora, this.state.marca, this.state.nombre, this.state.placa, this.state.telefono, this.state.ubicacion_actual, this.state.pago, this.state.paradasAdicionales ,this.state.correo]} funcion={"Crearpedido"} />
                                </Button>
                            </div>
                            <Link to="/SeleccionarCarro">
                                <Button type="submit" variant="warning"  style={{ margin:'16px' }}>Seleccionar carro</Button>
                            </Link>
                            <Link to="/MostrarTelefono">
                                <Button type="submit" variant="warning" style={{ margin:'16px' }}>Seleccionar teléfono</Button>
                            </Link>
                            

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}
