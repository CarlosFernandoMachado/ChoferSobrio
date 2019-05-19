import React , {Component} from 'react'
import { Jumbotron, Container } from 'react-bootstrap';
import './Seguridad.css'

export default class Seguridad extends Component{
    render(){
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina de Seguridad!</p>
                </Jumbotron>
            </Container>
        )
    }
}