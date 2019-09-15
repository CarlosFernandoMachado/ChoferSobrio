import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button,Form, Dropdown,Col} from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter,ListGroup, ListGroupItem,Collapse, CardBody } from 'reactstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';
import Fire from '../config/config';
export default class VisualizarChofer extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 300,
        }, {
            Header: 'Identidad',
            accessor: 'identidad',
            maxWidth: 150,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 150,
        }, {
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
            maxWidth: 300,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 100,
            filterable: false,
        },{
            Header: 'Accion2',
            accessor: 'accion2',
            maxWidth: 200,
            filterable: false,
        }];

        this.state = {
            infochofer: {},
            choferes: [],
            comentarios: [],
            permisos: props.permisos,
            correo_chofer:'',
            puntaje:0.0,
            contador:0,
            modal: false,
           chofer_actual:{},
            collapse: false
        };

        this.mostrarchoferes = this.mostrarchoferes.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.calificacion = this.calificacion.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
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
        const { choferes } = this.state;

        const conductores = [];

        Object.keys(choferes).forEach((key, index) => {
            const pedido = choferes[key];
            if (index !== 0 && choferes[key].estado =="activo") {
                pedido.accion = <Button variant="danger" onClick={() => this.eliminar(key)}>Eliminar</Button>;
                pedido.accion2 = <Button variant="info" onClick={() => this.calificacion(key)}>Calificacion</Button>;
                conductores.push(pedido);
            }
        })

        return conductores;
    }
    calificacion(keyPedido){
        var sub_puntaje = 0.0;
        var contar=0;
        firebase.database().ref('/chofer').once('value').then((snap) => {
            const choferes = snap.val();
            Object.keys(choferes).forEach((key, index) => {
                const chofer = choferes[key];
                if (keyPedido === key) {
                    this.setState({chofer_actual:chofer});
                    this.setState({correo_chofer:chofer.correo});
                    this.setState({contador:0});
                    const comentar=[];
                    let comentario =""; 
                    Fire.database().ref('/Feedback').once('value').then((snap) => {
                        const feeds = snap.val();
                        Object.keys(feeds).forEach((key, index) => {
                            const feed = feeds[key];
                            if (feed.correo_chofer == this.state.correo_chofer) {
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

    async eliminar(keyChofer) {
        const database = firebase.database();

        const idChofer = await database.ref(`/chofer/${keyChofer}`).once('value').then(snap => snap.val().identidad);

        // ver si tiene reservaciones
        const tieneP = await database.ref('/pedido').once('value').then((snap) => {
            const pedidos = snap.val();
            let tiene = false;
            Object.keys(pedidos).forEach((key) => {
                const pedido = pedidos[key];
                if (pedido.estado === 'Ocupado' && pedido.idchofer === idChofer) {
                    tiene = true;
                }
            });
            return tiene;
        });

        if (tieneP) {
            window.alert('No se puede eliminar, el chofer tiene pedidos!');
        } else if (window.confirm(' Se eliminara la cuenta')) {
            database.ref('chofer/' + keyChofer).update({
                estado: 'inactivo'
            });
        }
    }


    render() {
        const pedidos = this.mostrarchoferes();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Visualizar los Choferes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Choferes Existentes</h3>
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
                        <ModalHeader toggle={this.toggle}>Calificacion del chofer</ModalHeader>
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
                                                value={ this.state.chofer_actual.nombre }
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
                                                value={ this.state.chofer_actual.correo }
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