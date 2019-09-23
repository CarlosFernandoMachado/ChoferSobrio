import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';
import { Link } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import { MdCreate } from "react-icons/md";

export default class VisualizarCarros extends Component {

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
            Header: '',
            accessor: 'remove',
            maxWidth: 70,
            filterable: false,
        }, {
            Header: '',
            accessor: 'change',
            maxWidth: 70,
            filterable: false,
        }];

        this.state = {
            carros: {},
            cliente: {},
        };

        this.mostrarcarros = this.mostrarcarros.bind(this);
        this.buscarOtroCarro = this.buscarOtroCarro.bind(this);
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            this.dbRefClientes = firebase.database().ref('/cliente');
            this.dbCallbackClientes = this.dbRefClientes.on('value', (snap) => {
                const tempClientes = snap.val();
                let resCliente;
                Object.keys(tempClientes).forEach((key) => {
                    const cliente = tempClientes[key];
                    if (cliente.correo === user.email) {
                        resCliente = cliente;
                        resCliente.cKey = key;
                    }
                });
                this.setState({ cliente: resCliente });
            });

            this.dbRefCarros = firebase.database().ref('/carro');
            this.dbCallbackCarros = this.dbRefCarros.on('value', (snap) => {
                const tempCarros = snap.val();
                const resCarros = {};
                Object.keys(tempCarros).forEach((key, index) => {
                    const carro = tempCarros[key];
                    if (carro.correo === user.email) {
                        resCarros[key] = carro;
                    }
                });
                this.setState({ carros: resCarros });
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefCarros.off('value', this.dbCallbackCarros);
            this.dbRefClientes.off('value', this.dbCallbackClientes);
        }
    }

    eliminarcarro(key){
        const { carros, cliente } = this.state;
        const carro = carros[key];

        if (Object.keys(carros).length === 1) {
            window.alert('No puede eliminar el unico carro que tiene!');
            return;
        }

        if (window.confirm('Se eliminara el carro de su cuenta.')) {
            const database = firebase.database();
            if (cliente.placa === carro.placa) {
                const clienteRes = { ...cliente };
                delete clienteRes.cKey;

                const otro = this.buscarOtroCarro(key);

                clienteRes.marca = otro.marca;
                clienteRes.placa = otro.placa;
                clienteRes.color_vehiculo = otro.color;

                database.ref(`cliente/${cliente.cKey}`).update(clienteRes);
            }
            database.ref(`carro/${key}/`).remove();
            
        }
    }

    buscarOtroCarro(diferenteDe) {
        const { carros } = this.state;
        let res;
        Object.keys(carros).forEach((key) => {
            if (key !== diferenteDe) {
                res = carros[key];
            }
        });
        return res;
    }

    modificarcarro(key){
        const database = firebase.database();

        database.ref('carro/' + key).update({
            cambio: "si",
         });
    }

    mostrarcarros() {
        const { carros } = this.state;
        const car = [];

        Object.keys(carros).forEach((key, index) => {
            const carro = carros[key];
            carro.remove =  <Button variant="danger" onClick={() => this.eliminarcarro(key)}  ><FiTrash2/>
                            </Button>
            carro.change =  <Link to="/ModificarCarro">
                                <Button variant="success" onClick={() => this.modificarcarro(key)}><MdCreate/>
                                </Button>
                                </Link>
            car.push(carro);
        })

        return car;
    }


    render() {
        const { cliente } = this.state;
        const losCarros = this.mostrarcarros();
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
                            data={losCarros}
                            columns={this.columnas}
                            filterable
                        />
                        <div className="text-center">
                        <Link to="/AgregarCarro">
                                <Button type="submit" variant="warning">Agregar</Button>
                        </Link>
                            </div>
                    </Alert>
                </Card>
            </Container>
        )
    }
}