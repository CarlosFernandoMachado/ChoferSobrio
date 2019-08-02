import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import firebase from '../config/config';
import { Link } from 'react-router-dom';
import PedirChofer from '../PedirChofer/PedirChofer';
import Crear from '../Crear_C_G_C/Crear';

export default class SeleccionarCarro extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Color',
            accessor: 'color',
            maxWidth: 150,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 150,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 150,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 150,
            filterable: false,
        }];

        this.state = {
            clientes: [],
            id_cliente: '',
            carros: [],
        };


        this.mostrarcarros = this.mostrarcarros.bind(this);
        this.seleccionar = this.seleccionar.bind(this);


    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {

            var rootRef = firebase.database().ref().child("cliente");
            rootRef.on("child_added", snap => {
                var id = "1"
                var correo = snap.child("correo").val();

                if (correo == user.email) {
                    firebase.database().ref().child('cliente').orderByChild('correo').equalTo(user.email).on("value", function(snapshot) {
                        console.log(snapshot.val());
                        snapshot.forEach(function(data) {
                            id = data.key;

                        });
                    });
                   
                    this.setState({
                        id_cliente: id,
                    });
                }

            });


        
            this.dbRefCarros = firebase.database().ref('/carro');
            this.dbCallbackCarros = this.dbRefCarros.on('value', snap => this.setState({ carros: snap.val() }));
            this.dbRefCliente = firebase.database().ref('/cliente');
            this.dbCallbackCliente = this.dbRefCliente.on('value', snap => this.setState({ clientes: snap.val() }));
            
        }
    }
    

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefCarros.off('value', this.dbCallbackCarros);
            this.dbRefCliente.off('value', this.dbCallbackCliente);
        }
    }

    mostrarcarros() {
        const { carros } = this.state;
        const user = JSON.parse(localStorage.getItem('user'));
        const car = [];

        Object.keys(carros).forEach((key, index) => {
            const carro = carros[key];
            if (index !== 0 &&  carros[key].correo==user.email) {
                carro.accion =  <Link to="/PedirChofer">
                                    <Button variant="warning" onClick={() => this.seleccionar(this.state.id_cliente,carro.color,carro.marca,carro.placa)}>Seleccionar
                                    </Button>
                                 </Link>

                car.push(carros[key]);
            }
        })

        return car;
    }

    seleccionar(keyCliente,colour,brand,plate) {
        const database = firebase.database();

        var id= this.state.id_cliente;
        database.ref('cliente/' + keyCliente).update({
            color_vehiculo:colour,
            marca:brand,
            placa:plate
         });
    }
    


    render() {
        const carros = this.mostrarcarros();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Carros Registrados</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Carros</h3>
                        <br />
                        <ReactTable
                            data={carros}
                            columns={this.columnas}
                            filterable
                        />
                    </Alert>
                </Card>
            </Container>
        )
    }
}