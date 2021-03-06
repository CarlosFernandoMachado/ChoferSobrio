import React, { Component } from 'react'
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, Card, Alert, Dropdown } from 'react-bootstrap';

export default class PedirChofer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marca: 'Seleccione la marca de su vehículo.',
            color: 'Seleccione el color de su vehículo.',
            placa: '',
            validated: '',
            listo: 0,
            infoCliente: {},
            correo: '',
            keyCar: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectMarca = this.handleSelectMarca.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/carro').once('value').then((snap) => {
                const carros = snap.val();
                let infoCarro;
                Object.keys(carros).forEach(key => {
                    const carro = carros[key];
                    if (carro.correo === user.email && carro.cambio==="si") {
                        infoCarro = carro;
                        this.modificarCambio(key);
                        this.setState({keyCar: key});
                    }
                });
                return infoCarro;
            });

            this.setState({
                marca: info.marca,
                color: info.color,
                placa: info.placa,
            });
        }
    
    }

    modificarCambio(key){
        const database = firebase.database();

        database.ref('carro/' + key).update({
            cambio: "no",
         });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSelect(evtKey) {
        this.setState({ color: evtKey });
    }

    handleSelectMarca(evtKey) {
        this.setState({ marca: evtKey });
    }


    handleSubmit(event) {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        } else {
            /*VALIDACIONES*/
           if (this.state.placa.length != 7 || !/^[a+p+h+P+A+H][a-z+A-Z][a-z+A-Z][0-9][0-9][0-9][0-9]+$/.test(this.state.placa)) {
                /*Placa invalida*/
                this.setState({ placa: '' });
                document.getElementById("placa").value = "";
                this.setState({ validated: 'false' });
            } else if (this.state.marca == 'Seleccione la marca de su vehículo.') {
                this.setState({ validated: 'false' });
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.marca)) {
                /*Caracteres especiales*/
                this.setState({ marca: 'Seleccione la marca de su vehículo.' });
                document.getElementById("marcaField").value = "";
                this.setState({ validated: 'false' });
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.color)) {
                /*Caracteres especiales*/
                this.setState({ color: 'Seleccione el color de su vehículo.' });
                document.getElementById("colorField").value = "";
                this.setState({ validated: 'false' });
            } else if (this.state.color == 'Seleccione el color de su vehículo.') {
                this.setState({ validated: 'false' });
            } else{
                this.setState({ validated: 'true' });
                event.preventDefault();
                this.setState({ listo: 'true' });
                alert("Carro modificado");
            }
        }
        event.preventDefault();
        this.setState({ validated: 'false' });
    }

    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Registra un nuevo carro</h5>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
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
                                    <Form.Label>Color</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                            {this.state.color}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey='Amarillo' onSelect={this.handleSelect}>>
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
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Modificar Carro
                                    <Crear validado = {this.state.listo} datos={[this.state.keyCar,this.state.marca,this.state.placa,this.state.color]} funcion={"modificar_carro"}/>
                                </Button>
                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}