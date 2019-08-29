import React, { Component } from 'react'
import { Jumbotron, Container, Button, Form, Alert } from 'react-bootstrap';
import './feedback.css'
import Crear from '../Crear_C_G_C/Crear';
import swal from 'sweetalert';

export default class feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentarios: '',
            listo: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    EnviarCorreo = () =>{
        this.setState({ listo: 'true' });
       
        swal("Exito!", "Gracias por su retroalimentacion", "success")
    }

    render() {
        return (
            <Container>
                <div className="outer-div">
                    <div className="jumbotron-div">
                        <Jumbotron className="jumbo-boy" fluid>
                            <h1>Chofer Sobrio</h1>
                            <h5>Dinos lo que piensas</h5>
                        </Jumbotron>
                    </div>
                    <Alert variant="secondary">
                        <div className="form-div">
                            <Form>
                                <Form.Group>
                                    <Form.Label>Escribe tus comentarios</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="comentarios" id="comentarios" onChange={this.handleChange}/>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="button-div">
                            <div id="button" >
                                <Button onClick={this.EnviarCorreo}>Enviar</Button>
                                <Crear validado={this.state.listo} datos={this.state.comentarios} funcion={"CrearComentario"} />
                            </div>
                        </div>
                    </Alert>
                </div>
            </Container>
        )
    }
}