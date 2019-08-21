import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert, Dropdown } from 'react-bootstrap';
import './CrearCliente.css'
import firebase from '../config/config';
import Crear from '../Crear_C_G_C/Crear';


export default class Precios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            Color: 'Seleccione el color de su vehículo.',
            Marca: 'Seleccione la marca de su vehículo.',
            nombre: '',
            correo: '',
            Placa: 0,
            telefono: 0,
            validated: '',
            listo: 0,
            clientes: [],
            infocliente: {},
            telefono2:'',
            telefono3:'',
            contraseña:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectMarca = this.handleSelectMarca.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
      

    }

    handleSelect(evtKey) {
        this.setState({ Color: evtKey });
    }

    handleSelectMarca(evtKey) {
        this.setState({ Marca: evtKey });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        const form = event.currentTarget;
        var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
        var placa_cadena = this.state.Placa;
        var rex = /[a-z][a-z][a-z][0-9][0-9][0-9][0-9]+/i;
        var n = 0;

        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        } else {            
            if (length !== 8 || !/^[8-9372][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$/.test(this.state.telefono)) {
                this.setState({ telefono: '' });
                document.getElementById("telefono").value = "";
            } else if(this.state.telefono2!=='' && ((this.state.telefono2).length !== 8 || !/^[8-9372][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$/.test(this.state.telefono2))){
                    this.setState({ telefono2: '' });                 
                    document.getElementById("telefono2").value = "";   
                    alert("Ha ingresado un número opcional invalido, por favor vuelve a ingresarlo y sigue el formato de 8 digitos o puedes dejar el campo vacio y continuar.");                     
            } else if(this.state.telefono3!=='' && ((this.state.telefono3).length !== 8 || !/^[8-9372][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$/.test(this.state.telefono3))){
                this.setState({ telefono3: '' });                 
                document.getElementById("telefono3").value = "";   
                alert("Ha ingresado un número opcional invalido, por favor vuelve a ingresarlo y sigue el formato de 8 digitos o puedes dejar el campo vacio y continuar.");                     
            }else if (this.state.Marca == 'Seleccione la marca de su vehículo.') {
                this.setState({ validated: 'false' });
            } else if ( placa_cadena.length !== 7 || placa_cadena.match(rex) == null || !/^[a+p+h+P+A+H][a-z+A-Z][a-z+A-Z][0-9][0-9][0-9][0-9]+$/.test(this.state.Placa)) {
                this.setState({ Placa: '' });
                document.getElementById("Placa").value = "";
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre) || /^\s+$/.test(this.state.nombre)) {
                /*Caracteres especiales*/
                this.setState({ nombre: '' });
                document.getElementById("nombre").value = "";
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.Marca) || /^\s+$/.test(this.state.Marca)) {
                /*Caracteres especiales*/
                this.setState({ Marca: 'Seleccione la marca de su vehículo.' });
                document.getElementById("marcaField").value = "";
                this.setState({ validated: 'false' });
            } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.Color) || /^\s+$/.test(this.state.Color)) {
                this.setState({ Color: 'Seleccione el color de su vehículo.' });
                document.getElementById("colorField").value = "";
                this.setState({ validated: 'false' });
            } else if (this.state.color == 'Seleccione el color de su vehículo.') {
                this.setState({ validated: 'false' });
            } else if (this.state.contraseña.length<6){
                this.setState({validated: 'false'});
                this.setState({contraseña:''});
                document.getElementById("contraseña").value="";
                document.getElementById("contraseña").placeholder="Minimo 6 caracteres";
            }else {
                    this.setState({ validated: 'true' });
                    event.preventDefault();
                    this.setState({ listo: 'true' });
            }
        }
        event.preventDefault();
        this.setState({ validated: 'false' });

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
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Registrate con nosotros</h5>
                </Jumbotron>
                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            
                            <Form.Row>
                                <Form.Group as={Col} md="4" >
                                    <Form.Label>Color de vehículo:</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                            {this.state.Color}
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
                                                name="Color"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                placeholder="Ingrese el color del vehículo"
                                                id="colorField"
                                                bsRole="toggle"
                                            />
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9-]+)*$"
                                        placeholder="ejemplo@correo.com"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Correo Correctamente (correo@gmail.com)
                        </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" >
                                    <Form.Label>Marca de vehículo</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                            {this.state.Marca}
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
                                                name="Marca"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                placeholder="Ingrese la marca del vehículo"
                                                id="marcaField"
                                                bsRole="toggle"
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                                <Form.Group as={Col} md="4" >
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="nombre"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        id="nombre"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Nombre (A-Z)
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Placa</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="_ _ _ _ _ _ _"
                                            required
                                            name="Placa"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            id="Placa"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Numero de placa invalido 3 letras (A-Z) y 4 digitos(0-9)
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="telefono"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        id="telefono"

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Numero de telefono invalido siga el formato indicado 8 digitos numericos
                            </Form.Control.Feedback>
                              
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Telefono 2 (Opcional)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="telefono2"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        id="telefono2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Numero de telefono invalido siga el formato indicado 8 digitos numericos
                            </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Telefono 3 (Opcional)</Form.Label>
                                    <Form.Control
                                        
                                        type="number"
                                        name="telefono3"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        id="telefono3"

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Numero de telefono invalido siga el formato indicado 8 digitos numericos
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" >
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name="contraseña"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        id="contraseña"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese contraseña (minimo 6 caracteres)
                                </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" > Registrarse</Button>
                                <Crear validado = {this.state.listo} datos={[this.state.Color,this.state.correo,this.state.Marca,this.state.Placa]} funcion={"Crearcarro"}/>
                                <Crear validado={this.state.listo} datos={[this.state.Color, this.state.Marca, this.state.nombre, this.state.Placa, this.state.telefono, this.state.correo, this.state.telefono2,this.state.telefono3,this.state.contraseña]} funcion={"crear_cliente"} />
                            </div>


                        </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}