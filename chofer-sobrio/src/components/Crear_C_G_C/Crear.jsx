import React, { Component } from 'react'
import './Crear.css'
import Fire from '../config/config';


function redirigir() {
    window.location = "/";
}

export default class Crear extends Component {
    Crearchofer(id, identidad, name, number, email) {
        var database = Fire.database();
        database.ref('chofer/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number,
            correo: email,
            contraseña: "",
            validado: 0
        });
        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
            Fire.auth().sendPasswordResetEmail(email).then(
                alert("Se envio un correo de confirmacion a tu correo"))
        ).catch(alert("Usuario registrado, no se pudo enviar mensaje de conficion"));
    }
    Leerchofer(userId) {
        var database = Fire.database();
        var n = database.ref('/chofer/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificarchofer(id, name, number, email) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({

            nombre: name,
            telefono: number,
            correo: email,

        });
    }
    modificarvalidacionchofer(id, validado) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({

            validado: validado

        });
    }
    modificarvalidacioncliente(id, validado) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({

            validado: validado

        });
    }
    modificarvalidaciongerente(id, validado) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({

            validado: validado

        });
    }
    modificarcontraseñachofer(id, contraseña) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({
            contraseña: ""
        });
    }
    modificarcontraseñacliente(id, contraseña) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({
            contraseña: ""
        });
    }
    modificarcontraseñagerente(id, contraseña) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({
            contraseña: ""
        });
    }
    Eliminarchofer(id) {
        var database = Fire.database();
        database.ref('chofer/' + id).remove();
    }
    Creargerente(id, identidad, name, number, email) {
        var database = Fire.database();
        database.ref('gerente/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number,
            correo: email,
            contraseña: "",
            validado: 0

        });
        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
            Fire.auth().sendPasswordResetEmail(email).the(
                alert("Se envio un correo de confirmacion a tu correo"))
        );
    }
    Leergerente(userId) {
        var database = Fire.database();
        var n = database.ref('/gerente/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificargerente(id, name, number, email) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({

            nombre: name,
            telefono: number,
            correo: email
        });
    }
    EliminarGerente(id) {
        var database = Fire.database();
        database.ref('gerente/' + id).remove();
    }
    Crearcliente(id, color_vehiculo, marca, nombre, placa, telefono, email) {
        var database = Fire.database();
        database.ref('cliente/' + id).set({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            correo: email,
            contraseña: "",
            validado: 0
        });
        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
            Fire.auth().sendPasswordResetEmail(email).the(
                alert("Se envio un correo de confirmacion a tu correo"))
        );


    }
    Leercliente(userId) {
        var database = Fire.database();
        var n = database.ref('/cliente/'+ userId).once('value').then(function (snapshot) {
           var id = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';
            
        })
     

        return n;
    }

    modificarcliente(id, color_vehiculo, marca, nombre, placa, telefono) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono

        });
    }
    Eliminarcliente(id) {
        var database = Fire.database();
        database.ref('cliente/' + id).remove();
    }

    Crearpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion) {
        var database = Fire.database();
        database.ref('pedido/' + id).set({
            color: color_vehiculo,
            destino: destino,
            fecha: fecha,
            hora: hora,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            ubicacion: ubicacion
        });
    }
    Leerpedido(userId) {
        var database = Fire.database();
        var n = database.ref('/pedido/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificarpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion) {
        var database = Fire.database();
        database.ref('pedido/' + id).set({
            color: color_vehiculo,
            destino: destino,
            fecha: fecha,
            hora: hora,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            ubicacion: ubicacion
        });
    }
    Eliminarpedido(id) {
        var database = Fire.database();
        database.ref('pedido/' + id).remove();
    }
    render() {
        if (this.props.validado && this.props.funcion === "crear_gerente") {
            var database = Fire.database();
            var identity = this.props.datos[0];
            var name = this.props.datos[1];
            var telephone = this.props.datos[2];
            var email = this.props.datos[3];
            var id = 0;
            var n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_gerente) || 'Anonymous';
                id++;
                database.ref('gerente/' + id).set({
                    contraseña: "",
                    correo: email,
                    identidad: identity,
                    nombre: name,
                    telefono: telephone,
                    validado: 0
        
                });
                database.ref('referencias/').update({
                    id_gerente: id
                });
            })
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "Crearpedido") {
            var database = Fire.database();
            var colour = this.props.datos[0];
            var destination = this.props.datos[1];
            var date = this.props.datos[2];
            var hour = this.props.datos[3];
            var brand = this.props.datos[4];
            var name = this.props.datos[5];
            var plate = this.props.datos[6];
            var telephone = this.props.datos[7];
            var location = this.props.datos[8];
            var id = 0;
            var n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_pedido) || 'Anonymous';
                id++;
                database.ref('pedido/' + id).set({
                    color: colour,
                    destino: destination,
                    fecha: date,
                    hora: hour,
                    marca: brand,
                    nombre: name,
                    placa: plate,
                    telefono: telephone,
                    ubicacion: location
        
                });
                database.ref('referencias/').update({
                    id_pedido: id
                });
            })
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "crear_cliente") {
            var database = Fire.database();
            var colour = this.props.datos[0];
            var brand = this.props.datos[1];
            var name = this.props.datos[2];
            var plate = this.props.datos[3];
            var telephone = this.props.datos[4];
            var email = this.props.datos[5];
            var id = 0;
            var n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_cliente) || 'Anonymous';
                id++;
                database.ref('cliente/' + id).set({
                    color_vehiculo: colour,
                    contraseña: "",
                    correo: email,
                    marca: brand,
                    nombre: name,
                    placa: plate,
                    telefono: telephone,
                    validado: 0
                });
                database.ref('referencias/').update({
                    id_cliente: id
                });
            })
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "crear_chofer") {
            var database = Fire.database();
            var identity = this.props.datos[0];
            var name = this.props.datos[1];
            var telephone = this.props.datos[2];
            var email = this.props.datos[3];
            var id = 0;
            var n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_chofer) || 'Anonymous';
                id++;
                database.ref('chofer/' + id).set({
                    contraseña: "",
                    correo: email,
                    identidad: identity,
                    nombre: name,
                    telefono: telephone,
                    validado: 0
        
                });
                database.ref('referencias/').update({
                    id_chofer: id
                });
            })
            setTimeout(redirigir, 1000);
        }
        return (
            <div>
            </div>
        )

    }

}
