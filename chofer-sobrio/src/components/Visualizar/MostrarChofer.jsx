import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Form, Button ,Col,InputGroup} from 'react-bootstrap';
import './Visualizar.css'
import firebase from '../config/config';
import Crear from '../Crear_C_G_C/Crear';

export default class VisualizarChofer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infochofer: {},
            choferes: [],
        };
      
        this.mostrarchoferes = this.mostrarchoferes.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }
    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/chofer').once('value').then((snap) => {
                const choferlist = snap.val();
                let infochofer;
                Object.keys(choferlist).forEach((key, index) => {
                    const chofer = choferlist[key];
                    if (chofer.correo === user.email) {
                        chofer.index = index;
                        infochofer = chofer;
                    }
                });
                return infochofer;
            });

            // gerentes
            this.dbRefchofer = firebase.database().ref('/chofer');
            this.dbCallbackchofer = this.dbRefchofer.on('value', snap => this.setState({ choferes: snap.val() }));

            this.setState({
                infochofer: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefchofer.off('value', this.dbCallbackchofer);
        }
    }

    mostrarchoferes() {
        const { choferes, infochofer } = this.state;

        const choferesJSX = [];

        Object.keys(choferes).forEach((key, index) => {
            const pedido = choferes[key];
            if (index !== 0) {


                const { nombre, correo, telefono, identidad } = pedido;


                choferesJSX.push(
                    <tr key={index}>
                        <td>{nombre}</td>
                        <td>{telefono}</td>
                        <td>{correo}</td>
                        <td>{identidad}</td>
                        <td>
                            <Button variant="danger" onClick={() => this.eliminar(key)}>Eliminar</Button>
                        </td>
                    </tr>
                );
            }
        })

        return choferesJSX;
    }


    eliminar(keyPedido) {
        if (window.confirm(' Se eliminara la cuenta')) {


            const database = firebase.database();
            const { choferes } = this.state;

            const choferesRes = choferes.map(a => Object.assign({}, a));
            database.ref(`chofer/${keyPedido}/`).remove();
            console.log(this.state.infochofer.correo)
            
            var correo = this.state.infochofer.correo;
            var id = 0;
        }
    }


    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Datos de los Choferes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                   
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Identidad</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    
                                </tr>
                            </thead>
                            <tbody id="table_body">
                            {this.mostrarchoferes()}
                            </tbody>
                        </Table>
                        
                       
                    </Alert>
                </Card>
            </Container>
        )
    }
}