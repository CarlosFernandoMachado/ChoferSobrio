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
import IniciarSesion from './components/IniciarSesion/IniciarSesion';
import Password_olvidada from './components/Password_olvidada/Password_olvidada';
import ModificarContrasenaChofer from './components/ModificarContrasena/ModificarContrasenaChofer';
import ModificarContrasenaCliente from './components/ModificarContrasena/ModificarContrasenaCliente';
import ModificarContrasenaGerente from './components/ModificarContrasena/ModificarContrasenaGerente';
import { Gerente, Chofer } from './routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      permisos: null,
    };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      let permisos;

      // gerentes
      const isGerente = await firebase.database().ref('/gerente').once('value').then((snap) => {
        let isGerente = false;
        const gerentes = snap.val();
        gerentes.forEach(gerente => {
          isGerente = isGerente || gerente.correo === user.email; 
        });
        return isGerente;
      });
  
      // choferes
      const isChofer = await firebase.database().ref('/chofer').once('value').then((snap) => {
        let isChofer = false;
        const choferes = snap.val();
        choferes.forEach(chofer => {
          isChofer = isChofer || chofer.correo === user.email; 
        });
        return isChofer;
      });
  
      if (isGerente) {
        permisos = 'gerente';
      } else if (isChofer) {
        permisos = 'chofer';
      } else {
        permisos = null;
      }
  
      this.setState({ permisos });
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
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
          <SideDrawer show={this.state.sideDrawerOpen}  hide ={this.backdropClickHandler}/>
          {backdrop}
          <main style={{ marginTop: '64px' }}>
            <div>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/precios" component={Precios}></Route>
              <Route exact path="/seguridad" component={Seguridad}></Route>
              <Route exact path="/pedirchofer" component={PedirChofer}></Route>
              <Route exact path="/crear" component={Crear}></Route>
              <Gerente exact path="/CrearGerente" permisos={permisos} component={CrearGerente}></Gerente>
              <Gerente exact path="/CrearChofer" permisos={permisos} component={CrearChofer}></Gerente>
              <Chofer exact path="/pedidos" permisos={permisos} component={Pedidos}></Chofer>
              <Route exact path="/CrearCliente" component={CrearCliente}></Route>
              <Route exact path="/iniciarSesion" component={IniciarSesion}></Route>
              <Route exact path="/Password_olvidada" component={Password_olvidada}></Route>
              <Route exact path="/ModificarContrasenaChofer" component={ModificarContrasenaChofer}></Route>
              <Route exact path="/ModificarContrasenaCliente" component={ModificarContrasenaCliente}></Route>
              <Route exact path="/ModificarContrasenaGerente" component={ModificarContrasenaGerente}></Route>
            </div>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
