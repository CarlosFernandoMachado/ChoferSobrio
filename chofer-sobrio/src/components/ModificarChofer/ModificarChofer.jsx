import React, { Component } from 'react'
import { registerLocale, setDefaultLocale } from "react-datepicker"
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import es from 'date-fns/locale/es';
import './ModificarChofer.css';
import Fire from '../config/config';

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
            telefono2:'',
            telefono3:'',
            imagen: ''
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
        if (user) {
            const info = await firebase.database().ref('/chofer').once('value').then((snap) => {
                const choferlist = snap.val();
                let infoChofer;
                Object.keys(choferlist).forEach((key, index) => {
                    const chofer = choferlist[key];
                    if (chofer.correo === user.email) {
                        chofer.index = index;
                        infoChofer = chofer;
                    }
                });
                return infoChofer;
            });

            this.setState({
                id: info.index,
                nombre: info.nombre,
                correo: info.correo,
                telefono: info.telefono,
                identidad: info.identidad,
                telefono2: info.telefono2,
                telefono3: info.telefono3,
                imagen: info.imagen
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

    update_password = () => {
        const email = firebase.auth().currentUser.email;
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                alert('Se ha enviado un link de cambio de contrasena a ' + email);
            });
    }
    
    handleSubmit(event) {
        const form = event.currentTarget;
        var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
        var lengthID = this.state.identidad.length
        var estado = 0;
        var estado2 = 0;
        var estadoc = 0;
        var estado3 =0;
        var estado4 =0;
        var estado5=0;
        var estado6=0;
        var estado7=0;
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
           
            Fire.database().ref('cliente').orderByChild('telefono').equalTo(this.state.telefono).once('value').then(function (snapshot) {
                estado2 = snapshot.exists()
                Fire.database().ref('cliente').orderByChild('correo').equalTo(that.state.correo).once('value').then(function (snapshot) {
                    estadoc = snapshot.exists()
                    Fire.database().ref('chofer').orderByChild('identidad').equalTo(that.state.identidad).once('value').then(function (snapshot) {
                        estado = snapshot.exists()
                        Fire.database().ref('chofer').orderByChild('telefono').equalTo(that.state.telefono).once('value').then(function (snapshot) {
                            estado3 = snapshot.exists()
                            Fire.database().ref('chofer').orderByChild('correo').equalTo(that.state.correo).once('value').then(function (snapshot) {
                                estado4 = snapshot.exists()
                                Fire.database().ref('gerente').orderByChild('telefono').equalTo(that.state.telefono).once('value').then(function (snapshot) {
                                    estado5 = snapshot.exists()
                                    Fire.database().ref('gerente').orderByChild('correo').equalTo(that.state.correo).once('value').then(function (snapshot) {
                                        estado6 = snapshot.exists()
                                        Fire.database().ref('gerente').orderByChild('identidad').equalTo(that.state.identidad).once('value').then(function (snapshot) {
                                            estado7 = snapshot.exists()
                                           
                                                if (estado2==true || estado3==true ||estado5==true){
                                                    alert("El telefono que ha ingresado ya esta registrado en nuestro sistema, intente de nuevo.")
                                                    that.setState({ telefono: '' });
                                                    document.getElementById("telefono").value = "";
                                                    that.setState({ validated: 'false' });
                                                }
                                                
                                                 if (estado==true || estado7==true){
                                                    alert("La identidad que ha ingresado ya esta registrada en nuestro sistema, intente de nuevo.")
                                                    that.setState({ identidad: '' });
                                                    document.getElementById("identidad").value = "";
                                                    that.setState({ validated: 'false' });
                                                }
                                                if (form.checkValidity() === false) {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                        
                                                }   else{
                                                    that.setState({ validated: 'true' });
                                                    event.preventDefault();
                                                    that.setState({ listo: 'true' });
                                                }
                                    
                                            
                                
                                        })
                                        
                                    })
                        
                                })
                    
                            })
                            
                        })
            
                    })
        
                })
                
            });


        }
        this.setState({ validated: 'false' });
        event.preventDefault();
    }

    render() {
        const {
            validated,
            imagen,
        } = this.state;
        const compImagen = imagen ? (
            <img className="rounded-circle mx-auto d-block" width="20%" src={imagen} alt="Foto de perfil" />
            ) : null;

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
                            {compImagen}
                            <br />
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
                                    <Form.Label>Telefono</Form.Label>
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
                                        Ingrese su teléfono(8 digitos)
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Telefono 2(Opcional)</Form.Label>
                                    <Form.Control
                                      
                                        type="number"
                                        name="telefono2"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={this.state.telefono2}
                                        onChange={this.handleChange}
                                        id="telefono2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su teléfono(8 digitos)
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Telefono 3 (Opcional)</Form.Label>
                                    <Form.Control
                                        
                                        type="number"
                                        name="telefono3"
                                        placeholder="_ _ _ _ _ _ _ _"
                                        value={this.state.telefono3}
                                        onChange={this.handleChange}
                                        id="telefono3"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su teléfono(8 digitos)
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="3">
                                    <div className="text-left">
                                        <Button   variant="danger" onClick={this.update_password}>Cambiar contraseña</Button>
                                    </div>
                                   
                                </Form.Group>
                              
                          
                            </Form.Row>
                            <Form.Row>
                               
                            </Form.Row>
                            <Form.Row>
                               
                                
                            </Form.Row>

                            <div className="text-center">
                                <Button type="submit" variant="warning" >Guardar
                                <Crear validado={this.state.listo} datos={[ this.state.identidad,this.state.nombre, this.state.telefono, this.state.correo,this.state.id,this.state.telefono2,this.state.telefono3]} funcion={"modificar_chofer"} />
                                </Button>

                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}