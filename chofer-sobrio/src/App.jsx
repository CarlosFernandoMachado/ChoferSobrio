import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from './components/config/config';
import Home from './components/Home/Home';
import Precios from './components/Precios/Precios';
import Seguridad from './components/Seguridad/Seguridad';
import Toolbar from './components/Toolbar/Toolbar';
import Crear from './components/Crear_C_G_C/Crear'
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import PedirChofer from './components/PedirChofer/PedirChofer';
import CrearGerente from './components/CrearGerente/CrearGerente';
import CrearChofer from './components/CrearChofer/CrearChofer';
import CrearCliente from './components/CrearCliente/CrearCliente';
import Pedidos from './components/Pedidos/Pedidos';
import ModificarCliente from './components/ModificarCliente/ModificarCliente'
import ModificarChofer from './components/ModificarChofer/ModificarChofer'
import ModificarGerente from './components/ModificarGerente/ModificarGerente'
import IniciarSesion from './components/IniciarSesion/IniciarSesion';
import Password_olvidada from './components/Password_olvidada/Password_olvidada';
import { Gerente, Chofer, Cliente, GerenteChofer, Cualquiera } from './routes';
import ModificarContrasenaChofer from './components/ModificarContrasena/ModificarContrasenaChofer';
import ModificarContrasenaCliente from './components/ModificarContrasena/ModificarContrasenaCliente';
import ModificarContrasenaGerente from './components/ModificarContrasena/ModificarContrasenaGerente';
import MostrarChofer from './components/Visualizar/MostrarChofer';
import MostrarCliente from './components/Visualizar/MostrarCliente';
import MostrarGerente from './components/Visualizar/MostrarGerente';
import MiPerfil from './components/MiPerfil/MiPefil';
import Eliminar_Cuenta from './components/Eliminar_Cuenta/Eliminar_Cuenta';
import Eliminar_Cuenta_Cliente from './components/Eliminar_Cuenta/Eliminar_Cuenta_Cliente';
import feedback from './components/feedback/feedback';
import ListarFeedback from './components/feedback/ListarFeedback';
import Eliminar_Cuenta_Chofer from './components/Eliminar_Cuenta/Eliminar_Cuenta_Chofer';
import Historial from './components/Historial/Historial';
import Info from './components/Nosotros/Info';
import MisReservaciones from './components/Mis_Reservaciones/MisReservaciones';
import mapa from './components/Map/mapa';
import PreguntasFrecuentes from './components/Preguntas_Frecuentes/Preguntas_Frecuentes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sideDrawerOpen: false,
      isGerente: false,
      isChofer: false,
      isCliente: false,
      latitud: 14.0818,
      longitud: -87.20681,
    };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.setState({ user });

      // gerentes
      this.dbRefGerentes = firebase.database().ref('/gerente');
      this.dbCallbackGerentes = this.dbRefGerentes.on('value', (snap) => {
        const gerentes = snap.val();
        let isGerente = false;
        Object.keys(gerentes).forEach(key => {
          isGerente = isGerente || (gerentes[key].correo === user.email && gerentes[key].estado === "activo");
        });
        
        this.setState({ isGerente });
       

        
      });

      // choferes
      this.dbRefChoferes = firebase.database().ref('/chofer');
      this.dbCallbackChoferes = this.dbRefChoferes.on('value', (snap) => {
        const choferes = snap.val();
        let isChofer = false;
        Object.keys(choferes).forEach(key => {
          isChofer = isChofer ||(choferes[key].correo === user.email && choferes[key].estado === "activo");
        });
        this.setState({ isChofer });
      });

      // clientes
      this.dbRefClientes = firebase.database().ref('/cliente');
      this.dbCallbackClientes = this.dbRefClientes.on('value', (snap) => {
        const clientes = snap.val();
        let isCliente = false;
        Object.keys(clientes).forEach(key => {
          isCliente = isCliente || (clientes[key].correo === user.email && clientes[key].estado === "activo");;
        });
        this.setState({ isCliente });
      });
    }
    this.getLocation();
  }

  componentWillUnmount() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.dbRefGerentes.off('value', this.dbCallbackGerentes);
      this.dbRefChoferes.off('value', this.dbCallbackChoferes);
      this.dbRefClientes.off('value', this.dbCallbackClientes);
    }
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition = (position) => {
    this.setState({ latitud: position.coords.latitude });
    this.setState({ longitud: position.coords.longitude });
  }

  render() {
    const { isGerente, isChofer, isCliente } = this.state;
    
    let permisos = {
      gerente: isGerente,
      chofer: isChofer,
      cliente: isCliente
    };

    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} hide={this.backdropClickHandler} />
          {backdrop}
          <main style={{ marginTop: '64px' }}>
            <div>
              <Route exact path="/conocenos" component={Info}></Route>
              <Route exact path="/feedback" component={feedback}></Route>
              <Gerente exact path="/listarfeedback" permisos={permisos} component={ListarFeedback}></Gerente>
              <Cualquiera exact path="/" permisos={permisos} component={Home}></Cualquiera>
              <Route exact path="/precios" component={Precios}></Route>
              <Route exact path="/seguridad" component={Seguridad}></Route>
              <Route exact path="/crear" component={Crear}></Route>
              <Route exact path="/pedirchofer" permisos={permisos} component={PedirChofer}></Route>
              <Gerente exact path="/CrearGerente" permisos={permisos} component={CrearGerente}></Gerente>
              <Gerente exact path="/CrearChofer" permisos={permisos} component={CrearChofer}></Gerente>
              <Gerente exact path="/Historial" permisos={permisos} component={Historial}></Gerente>
              <GerenteChofer exact path="/reservaciones" permisos={permisos} component={Pedidos}></GerenteChofer>
              <GerenteChofer exact path="/mapa" permisos={permisos} component={mapa} latitud={this.state.latitud} longitud={this.state.longitud}></GerenteChofer>
              <Chofer exact path="/miperfil" permisos={permisos} component={MiPerfil}></Chofer>
              <Route exact path="/CrearCliente" component={CrearCliente}></Route>
              <Route exact path="/iniciarSesion" component={IniciarSesion}></Route>
              <Route exact path="/Password_olvidada" component={Password_olvidada}></Route>
              <Route exact path="/ModificarContrasenaChofer" component={ModificarContrasenaChofer}></Route>
              <Route exact path="/ModificarContrasenaCliente" component={ModificarContrasenaCliente}></Route>
              <Route exact path="/ModificarContrasenaGerente" component={ModificarContrasenaGerente}></Route>
              <Route exact path="/MostrarChofer" component={MostrarChofer}></Route>
              <Route exact path="/MostrarCliente" component={MostrarCliente}></Route>
              <Route exact path="/MostrarGerente" component={MostrarGerente}></Route>
              <Route exact path="/ModificarGerente" component={ModificarGerente}></Route>
              <Route exact path="/ModificarChofer" component={ModificarChofer}></Route>
              <Route exact path="/ModificarCliente" component={ModificarCliente}></Route>
              <Route exact path="/EliminarCuentaGerente" component={Eliminar_Cuenta}></Route>
              <Route exact path="/EliminarCuentaCliente" component={Eliminar_Cuenta_Cliente}></Route>
              <Route exact path="/EliminarCuentaChofer" component={Eliminar_Cuenta_Chofer}></Route>
              <Route exact path="/MisReservaciones" component={MisReservaciones}></Route>
              <Route exact path="/PreguntasFrecuentes" component={PreguntasFrecuentes}></Route>
            </div>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
