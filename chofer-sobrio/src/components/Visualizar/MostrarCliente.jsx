import React, { Component } from 'react'
//import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';
import Fire from '../config/config';
import { Jumbotron, Container, Table, Card, Alert, Button,Form, Dropdown,Col} from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter,ListGroup, ListGroupItem,Collapse, CardBody } from 'reactstrap';
import { timeout } from 'q';
export default class VisualizarCliente extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 300,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 150,
        },{
            Header: 'Telefono 2',
            accessor: 'telefono2',
            maxWidth: 300,
        }, {
            Header: 'Telefono 3 ',
            accessor: 'telefono3',
            maxWidth: 300,
        }, {
            Header: 'Correo',
            accessor: 'correo',
            maxWidth: 150,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 100,
        }, {
            Header: 'Color',
            accessor: 'color_vehiculo',
            maxWidth: 100,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 100,
        },{
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 200,
            filterable: false,
        }];
       

        this.state = {
            clientes: [],
            infocliente: {},
            comentarios: [],
            permisos: props.permisos,
            correo_cliente:'',
            puntaje:0.0,
            contador:0,
            modal: false,
            cliente_actual:{},
            collapse: false
        };

        this.mostrarclientes = this.mostrarclientes.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.calificacion = this.calificacion.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);

    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/cliente').once('value').then((snap) => {
                const clientelist = snap.val();
                let infocliente;
                Object.keys(clientelist).forEach((key, index) => {
                    const cliente = clientelist[key];
                    if (cliente.correo === user.email) {
                        cliente.index = index;
                        infocliente = cliente;
                    }
                });
                return infocliente;
            });

            // gerentes
            this.dbRefcliente = firebase.database().ref('/cliente');
            this.dbCallbackcliente = this.dbRefcliente.on('value', snap => this.setState({ clientes: snap.val() }));

            this.setState({
                infocliente: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefcliente.off('value', this.dbCallbackcliente);
        }
    }

    mostrarclientes() {
        const { clientes } = this.state;

        const usuarios = [];

        Object.keys(clientes).forEach((key, index) => {
            const pedido = clientes[key];
            if (index !== 0 &&  clientes[key].estado==="activo") {
                pedido.accion = <Button variant="info" onClick={() => this.calificacion(key)}>Calificacion</Button>;
                usuarios.push(pedido);
            }
        })

        return usuarios;
    }
    calificacion(keyPedido){
        this.setState({puntaje: 0.0});
        this.setState({comentarios:[]});
        var sub_puntaje = 0.0;
        var contar=0;
        firebase.database().ref('/cliente').once('value').then((snap) => {
            const clientes = snap.val();
            Object.keys(clientes).forEach((key, index) => {
                const cliente = clientes[key];
                if (keyPedido === key) {
                    this.setState({cliente_actual:cliente});
                    this.setState({correo_cliente:cliente.correo});
                    this.setState({contador:0});
                    const comentar=[];
                    let comentario =""; 
                    Fire.database().ref('/Feedback_chofer').once('value').then((snap) => {
                        const feeds = snap.val();
                        Object.keys(feeds).forEach((key, index) => {
                            const feed = feeds[key];
                            if (feed.correo_cliente == this.state.correo_cliente) {
                                console.log("ENTRO AL FEED");
                                sub_puntaje= sub_puntaje + parseInt(feed.puntaje);
                                contar+=1;
                                var promedio = sub_puntaje/contar;
                                this.setState({puntaje: promedio});
                                console.log("puntaje ",sub_puntaje);
                                console.log("contador ",contar);
                                comentario= comentario.concat(feed.comentario);
                                comentar.push(comentario);
                                this.setState({comentarios:comentar});
                            }
                        });
                    }); 
                    
                }
            });
        });
        this.toggle();

    }
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    toggle2() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    eliminar(keyPedido) {
        if (window.confirm(' Se eliminara la cuenta')) {
            const database = firebase.database();
            const { clientes } = this.state;
           
            var estadocuenta="inactivo"
            database.ref('cliente/' + keyPedido).update({
                estado:estadocuenta
             });
        }
    }


    render() {
        const pedidos = this.mostrarclientes();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Visualizar los Clientes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Clientes Existentes</h3>
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
                        <ModalHeader toggle={this.toggle}>Calificacion del cliente</ModalHeader>
                        <ModalBody>
                            <div className="divForm">
                                <Form>
                                    <Form.Row>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="8">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                            
                                                type="text"
                                                name="nombre"
                                                value={ this.state.cliente_actual.nombre }
                                                id="nombre"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="8">
                                            <Form.Label>Correo</Form.Label>
                                            <Form.Control
                                            
                                                type="text"
                                                name="nombre"
                                                value={ this.state.cliente_actual.correo }
                                                id="nombre"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="8">
                                            <Form.Label>Calificacion</Form.Label>
                                            <Form.Control
                                            
                                                type="text"
                                                name="nombre"
                                                value={ this.state.puntaje }
                                                id="nombre"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <div>
                                            <Button color="primary" onClick={this.toggle2} style={{ marginBottom: '1rem' }}>Comentarios</Button>
                                            <Collapse isOpen={this.state.collapse}>
                                            <Card>
                                                <CardBody>
                                                <ol>
                                                    {this.state.comentarios.map(comentario => <li>{comentario}</li>)}
                                                </ol>
                                                
                                                </CardBody>
                                            </Card>
                                            </Collapse>
                                        </div>
                                    </Form.Row>
                                </Form>
                    
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cerrar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        )
    }
}