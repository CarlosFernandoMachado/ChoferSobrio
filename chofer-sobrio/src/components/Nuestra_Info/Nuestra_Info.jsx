import React, { Component } from 'react'
import { Jumbotron, Container,Card } from 'react-bootstrap';
import firebase from '../config/config';
import './Nuestra_Info.css';

export default class NuestraInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            informacion: [],
        };


    }

    
    async componentDidMount() {
        this.dbRefInformacion = firebase.database().ref('/informacion');
        this.dbCallbackInformacion = this.dbRefInformacion.on('value', snap => this.setState({ informacion: snap.val() }));
    
    }

    mostrarInformacion(){
        const { informacion } = this.state;
        const info = [];

        Object.keys(informacion).forEach((key, index) => {
            const inf = informacion[key];

            const card = <Card className="text-center" bg="dark" text="white" border="warning" style={{ margin:'16px' }}>
                    <Card.Body>
                    <Card.Title>{inf.titulo}</Card.Title>
                     <Card.Text>                       
                         {inf.contenido}
                     </Card.Text>
                 </Card.Body>
            </Card>
                info.push(card);
            
                
        })

        return info;
    }
    
    componentWillUnmount() {
            this.dbRefInformacion.off('value', this.dbCallbackInformacion);
    }

    
    render() {        
        return (
            
            
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conocenos un poco más</h5>
                </Jumbotron>
         
                  {this.mostrarInformacion()}
            
            </Container>
        )
    }
}