import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Estatus } from '../../modelo/estatus';
import { Academico } from '../../modelo/academico';
import { Globales } from '../../modelo/globales';
import { Incidencia } from '../../modelo/incidencia';
import { ThrowStmt } from '@angular/compiler';
import { EstatusPerfil } from '../../modelo/estatus-perfil';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styles: []
})
export class IncidenciasComponent implements OnInit {
  miIncidencia: string

  incidencia: Incidencia = {}
  incidenciaNombre=''
  miOtraIncidencia:string="Alumnos no se presentan (1-3)"
  estatus: Estatus = {}
  enviarNotificacion:boolean=false
selected="Alumnos no se presentan (1-3)"
  esOtro=false
  estatusPerfil: EstatusPerfil;
  constructor(public http: HttpClient) {
    this.estatusPerfil = Globales.estatusPerfil;



  }

  ngOnInit() {
this.miIncidencia="Alumnos no se presentan (1-3)"
  }
  enviarOtros(){
    console.log("ya cambio")
    this.esOtro=true
  }
  todos(){
    console.log("todos");
    if(this.miIncidencia=='Otros')this.esOtro=true
    else this.esOtro=false
  }
  enviarIncidencia() {

this.incidenciaNombre=this.miIncidencia;
if(this.miIncidencia=='Otros'){
  console.log("esto se enviara "+this.miOtraIncidencia)
  this.incidenciaNombre=this.miOtraIncidencia
}


//Veremos cual incidencia aparece
console.log("LA INCIDENCIA A ENVIARSE "+this.incidenciaNombre);

//La fecha
const date = new Date();
let fecha=  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))+ '/' +((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) +
  '/' + date.getFullYear();
    this.incidencia = {

      campus: Globales.estatusPerfil.perfil.campus,
      idProfesor:Globales.estatusPerfil.perfil.id,
      fecha:fecha,
      rol: Globales.estatusPerfil.perfil.rol,
      nombre: this.incidenciaNombre

    }

    console.log("Esta incidencia seleccionaste " + this.miIncidencia)


    console.log("La incidencia es " + JSON.stringify(this.incidencia))
    //agregaos la incidencia
    //this.incidencias.push(this.incidencia)


console.log("SE enviara la notificacion:"+this.enviarNotificacion);
this.incidencia.enviarNotificacion=this.enviarNotificacion;

    this.http.post<Estatus>(Globales.urlBase + '/mensajeria/incidencia', this.incidencia).
      subscribe(respuesta => {

        this.estatus = respuesta;
        Swal.fire(
     
          this.estatus.mensaje
       
        )
         console.log("Estatus" + this.estatus.mensaje)
      })

    
  }

  /*
  Notificar incidencia
  */

  notificarIncidencia(){

    var idCoordinador=-9999
this.http.get<Estatus>(Globales.urlBase+"/token-coordinador/"+idCoordinador).subscribe(respuesta=>{
  this.estatus=respuesta;
  alert(this.estatus.mensaje);
})

  }
}
