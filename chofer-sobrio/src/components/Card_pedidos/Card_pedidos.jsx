/* eslint-disable react/no-typos */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Card, Button } from 'react-bootstrap';
import firebase from '../config/config';
import Fire from '../config/config';
class Card_pedidos extends Component {
	
	constructor(props) {
        super(props);
        this.color=props.color;
        this.destino=props.destino;
        this.fecha=props.fecha;
        this.hora=props.hora;
        this.idchofer=props.idchofer;
        this.marca=props.marca;
        this.mensaje=props.mensaje;
        this.nombre=props.nombre;
        this.placa=props.placa;
        this.telefono=props.telefono;
        this.ubicacion=props.ubicacion;
        this.pedidoId = props.pedidoId;
        this.db = firebase.database().ref().child('pedido');
	}

	handleReservarPedido(id) {
		this.props.reservarPedido(id);
	}

	render(props) {
		return (
			<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.nombre}</Card.Title>
                    <Card.Text>{this.fecha}</Card.Text>
                    <Card.Text>{this.hora}</Card.Text>
                    <Card.Text>{this.telefono}</Card.Text>
                    <Card.Text>{this.pedidoId}</Card.Text>
                    <Button variant="primary" onClick={() => this.handleReservarPedido(this.pedidoId)}>Reservar</Button>
                </Card.Body>
            </Card>
		)
	}

}

Card_pedidos.PropTypes = {
	noteContent: PropTypes.String	
};

export default Card_pedidos;