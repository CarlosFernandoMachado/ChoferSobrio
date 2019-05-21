import React, { Component } from 'react'
import './Crear.css'
import Fire from './Fire';



export default class Crear extends Component {
    Crearchofer(id, identidad, name, number) {
        var database = Fire.database();
        database.ref('chofer/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number
        });
    }
    Leerchofer(userId) {
        var database = Fire.database();
        var n = database.ref('/chofer/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificarchofer(id, name, number) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({

            nombre: name,
            telefono: number
        });
    }
    Eliminarchofer(id) {
        var database = Fire.database();
        database.ref('chofer/' + id).remove();
    }
    Creargerente(id, identidad, name, number) {
        var database = Fire.database();
        database.ref('gerente/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number
        });
    }
    Leergerente(userId) {
        var database = Fire.database();
        var n = database.ref('/gerente/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificargerente(id, name, number) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({

            nombre: name,
            telefono: number
        });
    }
    EliminarGerente(id) {
        var database = Fire.database();
        database.ref('gerente/' + id).remove();
    }
    Crearcliente(id, color_vehiculo, marca, nombre, placa, telefono) {
        var database = Fire.database();
        database.ref('cliente/' + id).set({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono
        });
    }
    Leercliente(userId) {
        var database = Fire.database();
        var n = database.ref('/cliente/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

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
        if (this.props.validado && this.props.funcion === "crear_gerente"){
            this.Creargerente(2,this.props.datos[0],this.props.datos[1],this.props.datos[2])
        }
        if (this.props.validado && this.props.funcion === "crear_cliente"){
            this.Crearcliente(2,this.props.datos[0],this.props.datos[1],this.props.datos[2],this.props.datos[3],this.props.datos[4])
        }
        return (
            <div>
            </div>
        )

    }

}
