import React, { Component } from 'react'
import { Jumbotron, Container, Card } from 'react-bootstrap';
import './IniciarSesion.css'
import { Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import Login from '../config/Login';
import { logout } from '../config/auth';
import { firebaseAuth } from '../config/config';
import { ButtonContainer } from '../config/Button';
import styled from 'styled-components';


export default class IniciarSesion extends Component {
    state = {
        authed: false,
        loading: true
    };

    componentDidMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged(async (user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));

                this.setState({
                    authed: true,
                    loading: false,
                    user
                });

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

    render() {

        const botonLogout = (
            <ButtonContainer id="btn-color-picker" onClick={logout}>
                <span className="ml-2 ">
                    <i className="fas fa-sign-out-alt" />
                </span>
                Cerrar sesión
            </ButtonContainer>
        );

        return (
            <Container>
                {/*<Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Inicia sesion</h5>
                </Jumbotron>
        */}
                <Form className="login-form">
                    {/* <FormGroup>
                        <Input type="email" placeholder="Correo" />
                    </FormGroup>

                    <FormGroup>
                        <Input type="password" placeholder="Contraseña" />
                    </FormGroup>

                    <Button className="btn-lg btn-dark btn-block">Iniciar sesión </Button>

                    <div className="text-center pt-3"> O continuar con una red social</div>
                   */}


                    {/*<FacebookLoginButton className="mt-3 mb-3"/>*/
                        /* instalar npm i react-social-login-buttons*/
                    }
                    <Card className="jumbo-boy">
                        <Card.Title className="text-center">Chofer Sobrio</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted text-center">Inicia sesion</Card.Subtitle>
                        <p></p>
                        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                            {this.state.authed ? botonLogout : <Login />}
                        </NavWrapper>
                        <div className="text-center">
                            <a href="/CrearCliente">Regístrate </a>
                            <span className="p-2"> | </span>
                            <Link to="/Password_olvidada"> Olvidé la contraseña</Link>
                            <br />
                            {this.state.authed ? <Link to="/ModificarContrasenaCliente">Modificar contraseña</Link> : null}
                        </div>
                    </Card>
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