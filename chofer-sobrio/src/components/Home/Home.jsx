import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        let logged = false;

        if (localStorage.getItem('user')) {
            logged = true;
        }

        this.state = {
            lat: 14.0818,
            lon: -87.20681,
            mostrar: null,
            logged,
            gerenteSuper: props.permisos.gerenteSuper,
            gerente: props.permisos.gerente,
            chofer: props.permisos.chofer,
            cliente: props.permisos.cliente,
            activo: props.permisos.activo,
            listo: props.permisos.listo
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        const { gerenteSuper,gerente, chofer, cliente, listo } = this.state;

        if (listo) {
            if (!localStorage.getItem('alertaLogin') && (gerenteSuper || gerente || chofer || cliente)) {
                localStorage.setItem('alertaLogin', true);
                this.setState({ mostrar: true });
            } else {
                this.setState({ mostrar: false });
            }
        }
        this.renderMap();
    }

    componentWillReceiveProps(nextProps) {
        const { gerenteSuper,gerente, chofer, cliente, activo, listo } = nextProps.permisos;

        let mostrar = (gerenteSuper || gerente || chofer || cliente) && listo;

        this.setState({
            gerenteSuper,
            gerente,
            chofer,
            cliente,
            activo,
            listo,
            mostrar,
        });
    }


    renderMap = () => {
        this.getLocation();
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyArotdf5MfhV5c3VmS_KrgosKN4fZgwnrE&callback=initMap")
        window.initMap = this.initMap
    }

    initMap = () => {
        var lat = Number(parseFloat(this.state.lat).toFixed(4));
        var lon = Number(parseFloat(this.state.lon).toFixed(4));
        var tegucigalpa = { lat: lat, lng: lon };
        var map = new window.google.maps.Map(
            document.getElementById('map'), { zoom: 18, center: tegucigalpa });
        var marker = new window.google.maps.Marker({
            position: tegucigalpa,
            map: map,
            draggable: true,
            animation: window.google.maps.Animation.DROP
        });
        marker.addListener('dragend',
            function (evt) {
                this.setState({ lat: marker.position.lat().toFixed(4) });
                this.setState({ lon: marker.position.lng().toFixed(4) });
                map.panTo(marker.getPosition());
                console.log('Ubicacion cuando se mueve el marcador en HOME');
                console.log('Latitud: ' + this.state.lat + ', Longitud: ' + this.state.lon);
            }.bind(this));
    }


    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    showPosition = (position) => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ lon: position.coords.longitude });
        console.log('Posicion cuando se carga la pagina');
        console.log('Latitud: ' + this.state.lat + ', Longitud: ' + this.state.lon)
    }

    toggleModal() {
        const { mostrar } = this.state;
        this.setState({ mostrar: !mostrar });
        localStorage.setItem('alertaLogin', true);
    }

    render() {
        const { gerenteSuper,gerente, chofer, cliente, activo, listo, mostrar, logged } = this.state;

        if (!listo) {
            return (
                <Container>
                    <div className="outer-div">
                        <div className="jumbotron-div">
                            <Jumbotron className="jumbo-boy" fluid>
                                <h1>Chofer Sobrio</h1>
                                <h5>Cargando...</h5>
                            </Jumbotron>
                        </div>
                        <div className="map-div" id="map"></div>
                        <div className="invisible-div"></div>
                    </div>
                </Container>
            );
        }

        let tipoUsuario = '';

        if (gerenteSuper) {
            tipoUsuario = 'Super Gerente';
        }

        if (gerente) {
            tipoUsuario = 'Gerente';
        }

        if (chofer) {
            tipoUsuario = 'Chofer';
        }

        if (cliente) {
            tipoUsuario = 'Cliente';
        }

        if (!tipoUsuario && logged) {
            return <Redirect to="/CrearCliente" />;
        }

        return (
            <Container>
                <div className="outer-div">
                    <div className="jumbotron-div">
                        <Jumbotron className="jumbo-boy" fluid>
                            <h1>Chofer Sobrio</h1>
                            <h5>Vuelve sin esquelas y sin accidentes a casa</h5>
                        </Jumbotron>
                    </div>
                    <div className="map-div" id="map"></div>

                    {tipoUsuario !== 'Cliente' && logged || (logged && !activo) ? null : (
                        <div className="navbar-home">
                            <Button className="pedir" onClick={this.renderMap}>Localizar</Button>
                            <Link to={{
                                pathname: '/pedirchofer',
                                state: {
                                    latitude: this.state.lat,
                                    longitude: this.state.lon
                                }
                            }}>
                                <div id="button">
                                    <Button className="pedir" >Pedir Chofer</Button>
                                </div>
                            </Link>
                        </div>
                    )}

                    <div className="invisible-div"></div>
                </div>
                <Modal isOpen={mostrar && !localStorage.getItem('alertaLogin')} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Enhorabuena!</ModalHeader>
                    <ModalBody>Has iniciado sesion como {tipoUsuario}!</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" block onClick={this.toggleModal}>Vale</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}
