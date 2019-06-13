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
import { Gerente, Chofer, Cliente } from './routes';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sideDrawerOpen: false,
      permisos: null,
    };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      // gerentes
      const isGerente = await firebase.database().ref('/gerente').once('value').then((snap) => {
        let isGerente = false;
        const gerentes = snap.val();
        Object.keys(gerentes).forEach(key => {
          isGerente = isGerente || gerentes[key].correo === user.email;
        });
        return isGerente;
      });

      // choferes
      const isChofer = await firebase.database().ref('/chofer').once('value').then((snap) => {
        let isChofer = false;
        const choferes = snap.val();
        Object.keys(choferes).forEach(key => {
          isChofer = isChofer || choferes[key].correo === user.email;
        });
        return isChofer;
      });

      // clientes
      const isCliente = await firebase.database().ref('/cliente').once('value').then((snap) => {
        let isCliente = false;
        const clientes = snap.val();
        Object.keys(clientes).forEach(key => {

          isCliente = isCliente || clientes[key].correo === user.email;
        });
        return isCliente;
      });

      const permisos = {
        gerente: isGerente,
        chofer: isChofer,
        cliente: isCliente,
      };

      this.setState({ permisos, user });
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

  render() {
    const { permisos } = this.state;

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
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/precios" component={Precios}></Route>
              <Route exact path="/seguridad" component={Seguridad}></Route>
              <Route exact path="/crear" component={Crear}></Route>
              <Cliente exact path="/pedirchofer" permisos={permisos} component={PedirChofer}></Cliente>
              <Gerente exact path="/CrearGerente" permisos={permisos} component={CrearGerente}></Gerente>
              <Gerente exact path="/CrearChofer" permisos={permisos} component={CrearChofer}></Gerente>
              <Gerente exact path="/Historial" permisos={permisos} component={Historial}></Gerente>
              <Route exact path="/reservaciones" permisos={permisos} component={Pedidos}></Route>
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
            </div>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
