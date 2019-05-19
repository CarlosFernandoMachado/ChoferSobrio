import React , {Component} from 'react'
import { Jumbotron, Container } from 'react-bootstrap';
import './Precios.css'

export default class Precios extends Component{
    render(){
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina precios!</p>
                </Jumbotron>
            </Container>
        )
    }
}