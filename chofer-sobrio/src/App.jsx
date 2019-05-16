import React , {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Precios from './components/Precios';
import Seguridad from './components/Seguridad';
import { Button } from 'react-bootstrap';
import Toolbar from './components/Toolbar';
import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';

class App extends Component {
  state={
    sideDrawerOpen: false
  };

  drawerToggleClickHandler=()=>{
    this.setState((prevState)=>{
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen:false});
  };

  render() {
    let backdrop;
    if(this.state.sideDrawerOpen){
      backdrop=<Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <main style={{ marginTop: '64px' }}>
          <Router>
            <div>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/precios" component={Precios}></Route>
              <Route exact path="/seguridad" component={Seguridad}></Route>
            </div>
          </Router>
        </main>
      </div>
    )
  }
}

export default App;
