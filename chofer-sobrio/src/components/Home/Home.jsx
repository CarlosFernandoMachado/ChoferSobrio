import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Button} from 'react-bootstrap';
import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lat: 14.0818,
          lon: -87.20681
        };
      }

    componentDidMount() {
        this.getLocation();
        this.renderMap();
    }

    componentDidUpdate(){
        this.renderMap();
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyArotdf5MfhV5c3VmS_KrgosKN4fZgwnrE&callback=initMap")
        window.initMap = this.initMap
    }

    initMap = () => {
        var lat = Number(parseFloat(this.state.lat).toFixed(4));
        var lon = Number(parseFloat(this.state.lon).toFixed(4));
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: lon },
            zoom: 18
        });
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    showPosition = (position) => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ lon: position.coords.longitude });
    }

    render() {
        return (
            <Container>
                <div className="outer-div">
                    <div className="jumbotron-div">
                        <Jumbotron className="jumbo-boy" fluid>
                            <h1>Chofer Sobrio</h1>
                            <h5>Vuelve sin esquelas y sin accidentes a casa</h5>
                        </Jumbotron>
                    </div>
                    <div className="map-div" id="map">
                    </div>
                    <div className="button-div">
                        <Link to="/pedirchofer">
                            <div id="button">
                                <Button className="pedir" >Pedir Chofer</Button>
                            </div>
                        </Link>
                    </div>
                    <div className="invisible-div">
                    </div>
                </div>
            </Container>
        )
    }
}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}