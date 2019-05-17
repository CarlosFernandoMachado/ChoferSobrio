import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
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
            fecha: '',
            hora: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('Nombre: ' + this.state.nombre + 'Telefono: ' + this.state.telefono);
        event.preventDefault();
    }
    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina para pedir chofer!</p>
                </Jumbotron>
                <form onSubmit={this.handleSubmit} className="formulario">
                    <label>
                        Nombre:
                    <input type="text" value={this.state.value} onChange={this.handleChange} name="nombre"/>
                    </label>
                    <br />
                    <label>
                        Telefono:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="telefono"/>
                    </label>
                    <br />
                    <label>
                        Marca:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="marca"/>
                    </label>
                    <br />
                    <label>
                        Color:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="color"/>
                    </label>
                    <br />
                    <label>
                        Placa:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="placa"/>
                    </label>
                    <br />
                    <label>
                        Ubicacion actual:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="ubicacion_actual"/>
                    </label>
                    <br />
                    <label>
                        Destino:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="destino"/>
                    </label>
                    <br />
                    <label>
                        Fecha:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="fecha"/>
                    </label>
                    <br />
                    <label>
                        Hora:
                    <input type="text" value={this.state.value} onChange={this.handleChange}  name="hora"/>
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </Container>
        )
    }
}