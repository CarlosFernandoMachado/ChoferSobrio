import React , {Component} from 'react';
import  {Form, Button,Container}  from 'react-bootstrap';
import { Input } from 'reactstrap';
import './Password_olvidada.css';
import firebase from 'firebase';
//import { resetPassword } from '../config/auth';


export default class Password_olvidada extends Component{
    constructor(props) {
        super(props);
        this.state = {
            correo: ' '
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({correo: event.target.value});
      }

    handleSubmit(event) {
        event.preventDefault();
        var email= this.state.correo;
        firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            alert('Correo enviado a: ' + this.state.correo);
            console.log("Por favor checka tu email ");
        })
        .catch((error) => {
            console.log("Error al momento de enviar correo");
      });

    }

    render(){
        return(
            <Container className="Reestablecer">
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Reestablecimiento de contraseña</Form.Label>
                        <Input type="text" id="correo" placeholder="Enter email" 
                        value={this.state.correo} onChange ={this.handleChange}/>
                        <Form.Text className="text-muted">
                            Se enviará un correo con un link para reestablecer constraseña.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" value="submit">Enviar correo</Button>
                </Form>
            </Container>
        )
    }
}
