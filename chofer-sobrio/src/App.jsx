import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
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
              <Route exact path="/CrearGerente" component={CrearGerente}></Route>
              <Route exact path="/CrearChofer" component={CrearChofer}></Route>
              <Route exact path="/CrearCliente" component={CrearCliente}></Route>
              <Route exact path="/pedidos" component={Pedidos}></Route>
              <Route exact path="/iniciarSesion" component={IniciarSesion}></Route>
              <Route exact path="/Password_olvidada" component={Password_olvidada}></Route>
            </div>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
