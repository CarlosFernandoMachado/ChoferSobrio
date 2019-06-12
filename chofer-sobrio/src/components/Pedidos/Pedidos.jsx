/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button } from 'react-bootstrap';
import './Pedidos.css'
// quitar
import firebase from '../config/config';
import Fire from '../config/config';
import Card_pedidos from '../Card_pedidos/Card_pedidos';

export default class Precios extends Component {

    constructor() {
        super();
        this.state = {
            pedidos: []
        };
        this.db = firebase.database().ref().child('pedido');
        this.reservarPedido = this.reservarPedido.bind(this);

    }

    componentDidMount() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var tommorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = tommorrow.getDate()
        var month = tommorrow.getMonth() + 1
        var year = tommorrow.getFullYear()
        var today2 = dd + '/' + mm + '/' + yyyy;
        tommorrow = day + '/' + month + '/' + year;
        const { pedidos } = this.state;

		this.db.on('child_added', snap => {
            var fecha = snap.val().fecha;
            if (fecha === today2 || fecha === tommorrow) {
                var estado_actual=snap.val().estado;
                if(estado_actual==="Disponible"){
                    pedidos.push({
                        color:snap.val().color,
                        destino:snap.val().destino,
                        fecha:snap.val().fecha,
                        hora:snap.val().hora,
                        idchofer:snap.val().idchofer,
                        marca:snap.val().marca,
                        mensaje:snap.val().mensaje,
                        nombre:snap.val().nombre,
                        placa:snap.val().placa,
                        telefono:snap.val().telefono,
                        ubicacion:snap.val().ubicacion,
                        pedidoId : snap.key
                    });
                }
            }

			this.setState({pedidos});
		});

		this.db.on('child_removed', snap => {
			for(let i = 0; i < pedidos.length; i++) {
				if(pedidos[i].pedidoId === snap.key) {
					pedidos.splice(i , 1);
				}
			}
			console.log(pedidos);
			this.setState({pedidos});
		});
    }
    reservarPedido(pedidoId){
        alert(pedidoId);
        var rootRef = firebase.database().ref().child('chofer');
        var idchofer=null;
        var usuario=firebase.auth().currentUser;
        var correo_actual=usuario.email;
        rootRef.on("child_added", snap => {
          var correo=snap.child("correo").val();
          if(correo===correo_actual){
              idchofer=snap.child("identidad").val();
          }
        });
        
        var database = Fire.database();
        database.ref('pedido/' + pedidoId).update({
                estado:'Ocupado',
                idchofer:idchofer

        });
    }
   
    
    
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones de hoy y mañana</h5>
                </Jumbotron>
                <div className="pedidosBody">
					{
						this.state.pedidos.map(pedido => {
							return (
								<Card_pedidos 
                                    color={pedido.color}
                                    destino={pedido.destino}
                                    fecha={pedido.fecha}
                                    hora={pedido.hora}
                                    idchofer={pedido.idchofer}
                                    marca={pedido.marca}
                                    mensaje={pedido.mensaje}
                                    nombre={pedido.nombre}
                                    placa={pedido.placa}
                                    telefono={pedido.telefono}
                                    ubicacion={pedido.ubicacion}
                                    pedidoId = {pedido.pedidoId}
                                    reservarPedido={this.reservarPedido.bind(this)}
								/>)
						})
					}
					
				</div>
                
            </Container>
        )
    }
}