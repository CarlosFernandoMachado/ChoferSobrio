import React , {Component} from 'react'
import { Jumbotron, Container, Button } from 'react-bootstrap';
import './IniciarSesion.css'
import { Form, FormGroup, Input } from 'reactstrap';
import Login from '../config/Login';
import { logout } from '../config/auth';
import { firebaseAuth } from '../config/config';
import { ButtonContainer } from '../config/Button';
import styled from 'styled-components';


export default class IniciarSesion extends Component{
    state = {
        authed: false,
        loading: true
      };

      componentDidMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged(user => {
          if (user) {
            this.setState({
              authed: true,
              loading: false,
              user
            });
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            this.setState({
              authed: false,
              loading: false,
              user: null
            });
            localStorage.clear();
          }
        });
      }
    
      componentWillUnmount() {
        this.removeListener();
      }

    render(){

        const botonLogout = (
            <ButtonContainer onClick={logout}>
                <span className="ml-2 ">
                    <i className="fas fa-sign-out-alt" />
                </span>
                Cerrar sesión
            </ButtonContainer>
        );

        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvenidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina Iniciar Sesión!</p>
                </Jumbotron>

                <Form className="login-form">
                <FormGroup>
                     <Input type="email" placeholder="Correo" />
                </FormGroup>

                <FormGroup>
                     <Input type="password" placeholder="Contraseña" />
                </FormGroup>
                
                <Button className="btn-lg btn-dark btn-block">Iniciar sesión </Button>
                
                <div className="text-center pt-3"> O continuar con una red social</div>
                
                {/*<FacebookLoginButton className="mt-3 mb-3"/>*/
                /* instalar npm i react-social-login-buttons*/
                }
        
                <div className="text-center">
                    <a href="/CrearCliente">Regístrate </a>
                    <span className="p-2"> | </span>
                    <Link to="/Password_olvidada"><a> Olvidé la contraseña </a></Link>
                </div>
        
                <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                    {this.state.authed ? botonLogout : <Login />}
                </NavWrapper>
            </Form>
            </Container>
            
            
        )
    }
}


const NavWrapper = styled.nav`
background: var(--mainBlue2);
.nav-link{
color: var(--mainWhite) !important;
font-size: 2.0rem;
text-transform: capitalize ; 
}
            
`;