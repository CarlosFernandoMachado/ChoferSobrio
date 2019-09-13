/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button,Form, Dropdown,Col} from 'react-bootstrap';
    import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ReactTable from 'react-table';

import './historial_servicios_chofer.css'
import firebase from '../config/config';

export default class historial_pedidos_cliente extends Component {

    constructor(props) {
        super(props);
        this.state ={}

        this.columnas = [{
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 200,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 150,
        }, {
            Header: 'Destino',
            accessor: 'destino',
            maxWidth: 200,
        }, {
            Header: 'Fecha',
            accessor: 'fecha',
            maxWidth: 100,
        }, {
            Header: 'Hora',
            accessor: 'hora',
            maxWidth: 100,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 100,
            filterable: false,
        }];

        this.state = {
            infoChofer: {},
            pedidos: [],
            permisos: props.permisos,
            id_chofer:"",
            fecha_pedido:"",
            puntuacion_pedido:1,
            comentario_pedido:"",
            key_pedido:"",
            telefono_pedido:"",
            modal: false
        };

        this.obtenerPedidos = this.obtenerPedidos.bind(this);
        this.handleSelectMarca = this.handleSelectMarca.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
   
    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
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

            // pedidos
            this.dbRefPedidos = firebase.database().ref('/pedido');
            this.dbCallbackPedidos = this.dbRefPedidos.on('value', snap => this.setState({ pedidos: snap.val() }));

            this.setState({
                infoChofer: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefPedidos.off('value', this.dbCallbackPedidos);
        }
    }


    calificar(keyPedido) {
        firebase.database().ref('/pedido').once('value').then((snap) => {
            const pedidolist = snap.val();
            Object.keys(pedidolist).forEach((key, index) => {
                const pedido = pedidolist[key];
                if (keyPedido === key) {
                    this.setState({id_chofer:pedido.idchofer});
                    this.setState({fecha_pedido:pedido.fecha});
                    this.setState({key_pedido:keyPedido});
                    this.setState({telefono_pedido:pedido.telefono});
                   
                }
            });
        });
        this.toggle();
    }

    finalizar_calificacion(){
        
        const nuevo_feedback ={
            comentario:this.state.comentario_pedido,
            telefono_cliente: this.state.telefono_pedido,
            puntaje:this.state.puntuacion_pedido,
            correo_chofer:this.state.infoChofer.correo,
            id_pedido: this.state.key_pedido,
            fecha: this.state.fecha_pedido
        };
        
        const dbRef = firebase.database().ref('Feedback_chofer');
        const newFeddback = dbRef.push();
        newFeddback.set(nuevo_feedback);
        alert("Se guardo calificacion del servicio");
        var database = firebase.database();
        database.ref('pedido/' + this.state.key_pedido).update({
            comentario_chofer: "Comentado",
        });
        
    }
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
    handleSelect(evtKey) {
        this.setState({ puntuacion_pedido: evtKey });
    }

    handleSelectMarca(evtKey) {
        this.setState({ puntuacion_pedido: evtKey });
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        
    }

    obtenerPedidos() {
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
        const { pedidos, permisos } = this.state;

        const listaPedidos = [];

        Object.keys(pedidos).forEach((key, index) => {
            const pedido = pedidos[key];
            if ( (pedido.comentario_chofer === "Ninguno" && (pedido.estado === "Finalizado" || pedido.estado === "Calificado")) && this.state.infoChofer.identidad === pedido.idchofer ) {

                    pedido.accion =   <Button variant="info"  onClick={() => this.calificar(key)}>Calificar</Button>;

                listaPedidos.push(pedido);
            }
        });

        return listaPedidos;
    }

    render() {
        const pedidos = this.obtenerPedidos();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Historial de tus servicios</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <h3>Servivios por calificar</h3>
                        <br />
                        <ReactTable
                            data={pedidos}
                            columns={this.columnas}
                            filterable
                        />
                    </Alert>
                </Card>
                
                <div> 
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Calificacion de servicio</ModalHeader>
                        <ModalBody>
                            <div className="divForm">
                                <Form>
                                    <Form.Row>
                                    </Form.Row>
                                    <Form.Row>

                                    </Form.Row>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Puntuacion</Form.Label>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                                {this.state.puntuacion_pedido}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey='1' onSelect={this.handleSelect}>
                                                    1
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey='2' onSelect={this.handleSelectMarca}>
                                                    2
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey='3' onSelect={this.handleSelectMarca}>
                                                    3
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey='4' onSelect={this.handleSelectMarca}>
                                                    4
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey='5' onSelect={this.handleSelectMarca}>
                                                    5
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control onChange={ this.handleChange } name="comentario_pedido"  id="comentario_pedido" as="textarea" rows="3" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={()=>this.finalizar_calificacion()}>
                                        Finalizar calificacion
                                    </Button>
                                </Form>
                    
                            </div>
                        </ModalBody>
                        <ModalFooter>
                          
                            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        )
    }
}