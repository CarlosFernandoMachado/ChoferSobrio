import React, { Component } from 'react'
import './Crear.css'
import Fire from '../config/config';
import firebase from '../config/config';
//import firebaseAuth from '../config/config';

function redirigir() {
    window.location = "/";
}
function redirigircrearcliente() {
    window.location = "/CrearCliente";
}
function redirigircrearchofer() {
    window.location = "/CrearChofer";
}
function redirigircreargerente() {
    window.location = "/CrearGerente";
}

function redirigirPagoTarjeta(producto) {
    console.log(producto);
    const urlPago = 'https://checkout.baccredomatic.com/ODQyMDQwMWQwNGU3M2Y2OTU5My42ODAxNTY1NDU1OTY4';
    window.location = urlPago;
}

export default class Crear extends Component {

    Crearchofer(id, identidad, name, number, email) {
        var database = Fire.database();
        database.ref('chofer/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number,
            correo: email
        });
        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
            Fire.auth().sendPasswordResetEmail(email).then(
                alert("Se te ha enviado un correo de confirmación."))
        ).catch(alert("Usuario registrado, no se pudo enviar mensaje de confirmación"));
    }

    Leerchofer(userId) {
        var database = Fire.database();
        var n = database.ref('/chofer/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';
        })
        return n;
    }

    modificarchofer(id, id2, name, number, email, telefono2, telefono3) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({
            identidad: id2,
            nombre: name,
            telefono: number,
            correo: email,
            telefono2: telefono2,
            telefono3: telefono3
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

    /* update_password_cliente = () => {
         const email = Fire.auth().currentUser.email;
         Fire.auth().sendPasswordResetEmail(email)
             .then(function () {
                 alert('Se ha enviado un link de cambio de contrasena a ' + email);
             });
     }*/

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
            correo: email
        });
        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
            Fire.auth().sendPasswordResetEmail(email).the(
                alert("Se te ha enviado un correo de confirmación."))
        );
    }

    Leergerente(userId) {
        var database = Fire.database();
        var n = database.ref('/gerente/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';
        })
        return n;
    }

    modificargerente(id, id2, name, number, email, telefono2, telefono3) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({
            identidad: id2,
            nombre: name,
            telefono: number,
            correo: email,
            telefono2: telefono2,
            telefono3: telefono3
        });
    }

    EliminarGerente(id) {
        var database = Fire.database();
        database.ref('gerente/' + id).remove();
    }

    Crearcliente(id, color_vehiculo, marca, nombre, placa, telefono, email) {
        var database = Fire.database();
        //window.alert("se registrara usuario");
        Fire.auth().createUserWithEmailAndPassword(email, '123456');
        database.ref('cliente/' + id).set({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            correo: email
        });
    }

    Leercliente(userId) {
        var database = Fire.database();
        var n = database.ref('/cliente/' + userId).once('value').then(function (snapshot) {
            var id = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';
        })
        return n;
    }

    modificarcliente(id, color_vehiculo, marca, nombre, placa, telefono, email, telefono2, telefono3) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            correo: email,
            telefono2: telefono2,
            telefono3: telefono3

        });
    }


    Eliminarcliente(id) {
        var database = Fire.database();
        database.ref('cliente/' + id).remove();
    }

    Crearpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion, pagoTarjeta) {
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
            ubicacion: ubicacion,
            estado: "Disponible",
            idchofer: 0,
            mensaje: 'ninguno',
            pagoTarjeta: pagoTarjeta,
        });
    }

    Crearcarro(id, color, correo, marca, placa) {
        var database = Fire.database();
        database.ref('carro/' + id).set({
            color: color,
            marca: marca,
            placa: placa,
            correo: correo,
        });
    }


    Leerpedido(userId) {
        var database = Fire.database();
        var n = database.ref('/pedido/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        return n;
    }

    modificarpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion, pagoTarjeta) {
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
            ubicacion: ubicacion,
            pagoTarjeta: pagoTarjeta,
        });
    }

    modificarCarro(key,colour,brand,plate){
        var database = Fire.database();
        database.ref('carro/' + key).update({
            color: colour,
            marca: brand,
            placa: plate,
         });
    }

    Eliminarpedido(id) {
        var database = Fire.database();
        database.ref('pedido/' + id).remove();
    }

    async tienePedido(numId, database) {
        // ver si tiene reservaciones
        const tieneP = await database.ref('/pedido').once('value').then((snap) => {
            const pedidos = snap.val();
            let tiene = false;
            Object.keys(pedidos).forEach((key) => {
                const pedido = pedidos[key];
                if (pedido.estado === 'Ocupado' && pedido.idchofer === numId) {
                    tiene = true;
                }
            });
            return tiene;
        });
        return tieneP;
    }

    render() {
        var databse = null;
        var n = null;
        var identity;
        var name;
        var telephone;
        var email;
        var id = 0;
        var colour;
        var destination;
        var date;
        var hour;
        var brand;
        var plate;
        var location;
        var pagoTarjeta;

        if (this.props.validado && this.props.funcion === "crear_gerente") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            var telefono2 = this.props.datos[4];
            var telefono3 = this.props.datos[5];
            var estadocuenta = "activo"
            id = 0;
            var estado = 0;
            var estado2 = 0;
            id = 0;
            Fire.database().ref('gerente').orderByChild('identidad').equalTo(identity).once('value').then(function (snapshot) {
                estado = snapshot.exists()
                Fire.database().ref('gerente').orderByChild('correo').equalTo(email).once('value').then(function (snapshot) {
                    estado2 = snapshot.exists()
                    if (estado === true) {
                        alert("identidad invalida ya existe")
                        /*setTimeout(redirigircreargerente, 1000)*/
                        document.getElementById("identidad").value = "";
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        /*setTimeout(redirigircreargerente, 1000)*/
                        document.getElementById("correo").value = "";
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_gerente) || 'Anonymous';
                            id++;
                            database.ref('gerente/' + id).set({
                                correo: email,
                                estado: estadocuenta,
                                identidad: identity,
                                nombre: name,
                                telefono: telephone,
                                telefono2: telefono2,
                                telefono3: telefono3
                            });
                            database.ref('referencias/').update({
                                id_gerente: id
                            });
                        })
                        setTimeout(redirigir, 1000);
                    }
                });
            });
        }

        if (this.props.validado && this.props.funcion === "Crearpedido") {
            var database = Fire.database();
            colour = this.props.datos[0];
            destination = this.props.datos[1];
            date = this.props.datos[2];
            hour = this.props.datos[3];
            brand = this.props.datos[4];
            name = this.props.datos[5];
            plate = this.props.datos[6];
            telephone = this.props.datos[7];
            location = this.props.datos[8];
            pagoTarjeta = this.props.datos[9];

            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
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
                    ubicacion: location,
                    estado: 'Disponible',
                    idchofer: 0,
                    mensaje: 'ninguno',
                    pagoTarjeta: pagoTarjeta,

                });
                database.ref('referencias/').update({
                    id_pedido: id
                });
            })
            if(pagoTarjeta)
            {
                redirigirPagoTarjeta('standard');
            }
            else
            {
                setTimeout(redirigir, 1000);
            }
        }

        if (this.props.validado && this.props.funcion === "Crearcarro") {
            var database = Fire.database();
            colour = this.props.datos[0];
            email = this.props.datos[1];
            brand = this.props.datos[2];
            plate = this.props.datos[3];
            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_carro) || 'Anonymous';
                id++;
                database.ref('carro/' + id).set({
                    color: colour,
                    marca: brand,
                    placa: plate,
                    correo: email,
                    cambio: "no",
                });
                database.ref('referencias/').update({
                    id_carro: id
                });
            })
        }

        if (this.props.validado && this.props.funcion === "crear_cliente") {
            database = Fire.database();
            colour = this.props.datos[0];
            brand = this.props.datos[1];
            name = this.props.datos[2];
            plate = this.props.datos[3];
            telephone = this.props.datos[4];
            email = this.props.datos[5];
            var my_contraseña=this.props.datos[8];
            var telefono2 = this.props.datos[6]
            var telefono3 = this.props.datos[7]
            var estadocuenta = "activo"
            var estado = 0;
            var estado2 = 0;
            id = 0;
            Fire.database().ref('cliente').orderByChild('placa').equalTo(plate).once('value').then(function (snapshot) {
                estado = snapshot.exists()
                Fire.database().ref('cliente').orderByChild('correo').equalTo(email).once('value').then(function (snapshot) {
                    estado2 = snapshot.exists()
                    if (estado === true) {
                        alert("placa invalida ya existe")
                        /*setTimeout(redirigircrearcliente, 1000)*/
                        document.getElementById("Placa").value = "";
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        /*setTimeout(redirigircrearcliente, 1000)*/
                        document.getElementById("correo").value = "";
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_cliente) || 'Anonymous';
                            id++;
                            database.ref('cliente/' + id).set({
                                color_vehiculo: colour,
                                correo: email,
                                estado: estadocuenta,
                                marca: brand,
                                nombre: name,
                                placa: plate,
                                telefono: telephone,
                                telefono2: telefono2,
                                telefono3: telefono3
                            });
                            database.ref('referencias/').update({
                                id_cliente: id
                            });
                        });
                        Fire.auth().createUserWithEmailAndPassword(email, my_contraseña).then(
                        ).catch();
                        alert("¡Usuario registrado exitosamente!");

                        setTimeout(redirigir, 1000);
                    }
                });
            });
        }

        if (this.props.validado && this.props.funcion === "crear_chofer") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            var telefono2 = this.props.datos[4];
            var telefono3 = this.props.datos[5];
            id = 0;
            var estadocuenta = "activo"
            var estado = 0;
            var estado2 = 0;

            Fire.database().ref('chofer').orderByChild('identidad').equalTo(identity).once('value').then(function (snapshot) {
                estado = snapshot.exists()

                Fire.database().ref('chofer').orderByChild('correo').equalTo(email).once('value').then(function (snapshot) {
                    estado2 = snapshot.exists()
                    if (estado === true) {
                        alert("identidad invalida ya existe")
                        /*setTimeout(redirigircrearchofer, 1000)*/
                        document.getElementById("identidad").value = "";
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        /*setTimeout(redirigircrearchofer, 1000)*/
                        document.getElementById("correo").value = "";
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_chofer) || 'Anonymous';
                            id++;
                            database.ref('chofer/' + id).set({
                                correo: email,
                                estado: "activo",
                                identidad: identity,
                                nombre: name,
                                telefono: telephone,
                                telefono2: telefono2,
                                telefono3: telefono3
                            });
                            database.ref('referencias/').update({
                                id_chofer: id
                            });
                        });
                        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(function (_userRecord) {
                            Fire.auth().sendPasswordResetEmail(email);
                        });
                        setTimeout(redirigir, 1000);
                    }
                });
            });
        }

        if (this.props.validado && this.props.funcion === "CrearComentario") {
            database = Fire.database();
            var comentario = this.props.datos;
            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_comentarios) || 'Anonymous';
                id++;
                database.ref('comentarios/' + id).set({
                    contenido: comentario
                });
                database.ref('referencias/').update({
                    id_comentarios: id
                });
            });
            setTimeout(redirigir, 1000);
        }

        if (this.props.validado && this.props.funcion === "crear_pregunta") {
            database = Fire.database();
            var pregunta = this.props.datos[0];
            var respuesta = this.props.datos[1];
            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_pregunta) || 'Anonymous';
                id++;
                database.ref('preguntafrecuente/' + id).set({
                    pregunta: pregunta,
                    respuesta: respuesta,
                });
                database.ref('referencias/').update({
                    id_pregunta: id
                });
            });
            setTimeout(redirigir, 1000);
        }

        if (this.props.validado && this.props.funcion === "crearhistorial") {
            database = Fire.database();
            var driver = this.props.datos[0];
            var driverid = this.props.datos[1];
            var customer = this.props.datos[2];
            colour = this.props.datos[3];
            destination = this.props.datos[4];
            date = this.props.datos[5];
            var hour_appointed = this.props.datos[6];
            var hour_delivered = this.props.datos[7];
            brand = this.props.datos[8];
            plate = this.props.datos[9];
            location = this.props.datos[10];
            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_historial) || 'Anonymous';
                id++;
                database.ref('Historial/' + id).set({
                    chofer: driver,
                    id_chofer: driverid,
                    cliente: customer,
                    color: colour,
                    destino: destination,
                    fecha: date,
                    hora_pedido: hour_appointed,
                    hora_final: hour_delivered,
                    marca: brand,
                    placa: plate,
                    ubicacion: location,
                });
                database.ref('referencias/').update({
                    id_historial: id
                });
            })
        }
        if (this.props.validado && this.props.funcion === "modificar_cliente") {
            database = Fire.database();
            colour = this.props.datos[0];
            brand = this.props.datos[1];
            name = this.props.datos[2];
            plate = this.props.datos[3];
            telephone = this.props.datos[4];
            email = this.props.datos[5];
            id = this.props.datos[6];
            var telefono2 = this.props.datos[7];
            var telefono3 = this.props.datos[8];
            this.modificarcliente(id, colour, brand, name, plate, telephone, email, telefono2, telefono3)
            setTimeout(redirigir, 1000);
        }

        if (this.props.validado && this.props.funcion === "modificar_carro") {
            database = Fire.database();
            id = this.props.datos[0];
            brand = this.props.datos[1];
            plate = this.props.datos[2];
            colour = this.props.datos[3];
            this.modificarCarro(id,colour,brand,plate)
            alert("Modificado correctamente");
            setTimeout(redirigir, 1000);
        }


        /*if (this.props.validado && this.props.funcion === "password_cliente") {
        
            this.update_password_cliente();
        }*/

        if (this.props.validado && this.props.funcion === "modificar_gerente") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            id = this.props.datos[4];
            var telefono2 = this.props.datos[5];
            var telefono3 = this.props.datos[6];
            this.modificargerente(id, identity, name, telephone, email, telefono2, telefono3);
            setTimeout(redirigir, 1000);
        }

        /*if (this.props.validado && this.props.funcion === "password_gerente") {
            this.update_password_cliente();
        }*/

        if (this.props.validado && this.props.funcion === "modificar_chofer") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            id = this.props.datos[4];
            var telefono2 = this.props.datos[5];
            var telefono3 = this.props.datos[6]
            this.modificarchofer(id, identity, name, telephone, email, telefono2, telefono3);
            setTimeout(redirigir, 1000);
        }

        /*if (this.props.validado && this.props.funcion === "password_chofer") {
            this.update_password_cliente();
        }*/

        if (this.props.validado && this.props.funcion === "eliminar_chofer") {
            var estadocuenta = "inactivo"
            const [id, numId] = this.props.datos;
            database = Fire.database();

            this.tienePedido(numId, database).then((tieneP) => {
                if (!tieneP) {
                    database.ref('chofer/' + id).update({
                        estado: estadocuenta,
                    });
                    setTimeout(redirigir, 1000);
                } else {
                    alert("No puede desactivar la cuenta porque tiene pedido pendiente");
                }
            });
        }
        if (this.props.validado && this.props.funcion === "eliminar_chofer_t") {
            var estadocuenta = "inactivo"
            const [id, numId] = this.props.datos;
            database = Fire.database();

            this.tienePedido(numId, database).then((tieneP) => {
                if (!tieneP) {
                    var database = Fire.database();
                    database.ref('chofer/' + id).remove();
                    setTimeout(redirigir, 1000);
                } else {
                    alert("No puede eliminar la cuenta porque tiene pedido pendiente");
                }
            });
        }

        if (this.props.validado && this.props.funcion === "eliminar_cliente") {
            var estadocuenta = "inactivo"
            id = this.props.datos[0]
            database = Fire.database();

            database.ref('cliente/' + id).update({
                estado: estadocuenta
            });
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "eliminar_cliente_t") {
            const user = JSON.parse(localStorage.getItem('user'));

            var cont = 0;
            if (user) {

                var rootRef = firebase.database().ref().child("carro");
                rootRef.on("child_added", snap => {



                    firebase.database().ref().child('carro').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                        console.log(snapshot.val());
                        snapshot.forEach(function (data) {
                            var id2 = data.key;
                            var database = Fire.database();
                            database.ref('carro/' + id2).remove();
                        });
                    });




                });



            }



            id = this.props.datos[0]
            database = Fire.database();
           

           

            this.Eliminarcliente(id);
            
            setTimeout(redirigir, 1000);
        }

        if (this.props.validado && this.props.funcion === "eliminar_gerente") {
            var estadocuenta = "inactivo"
            id = this.props.datos[0]
            database = Fire.database();

            database.ref('gerente/' + id).update({
                estado: estadocuenta
            });
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "eliminar_gerente_t") {
           
            id = this.props.datos[0]
            database = Fire.database();

            this.EliminarGerente(id);
            setTimeout(redirigir, 1000);
        }


        return (
            <div>
            </div>
        )

    }

}
