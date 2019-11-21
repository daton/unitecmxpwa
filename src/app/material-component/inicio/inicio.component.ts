import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../modelo/perfil';
import { Globales } from '../../modelo/globales';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { mergeMapTo } from 'rxjs/operators';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Token } from '../../modelo/token';
import { Estatus } from '../../modelo/estatus';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']

})
export class InicioComponent implements OnInit {

  perfil: Perfil
  nombreCompleto: string
  miRol: string

  token: Token = {}
  estatus: Estatus = {}



  constructor(private afMessaging: AngularFireMessaging, private http: HttpClient) {




  }


  // get permission to send messages




  ngOnInit() {
    this.perfil = Globales.estatusPerfil.perfil
    if (this.perfil.rol == 'coordinador') this.miRol = 'Coordinador'
    if (this.perfil.rol == 'profesor') this.miRol = 'Profesor'
    this.nombreCompleto = this.perfil.nombre + " " + this.perfil.paterno + " " + this.perfil.materno


    //Para firbase Messaging

    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          this.token.token = token;
        },
        (error) => { console.error(error); }
      );


  }


  permitir() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);

          //Obtenemos el id del perfil
          var miIdPerfil = Globales.estatusPerfil.perfil.id;
          var miCampus=Globales.estatusPerfil.perfil.campus;
          //Lo ajustamos al token
          this.token.idPerfil = miIdPerfil
          this.token.campus=miCampus
          //ENVIAR TOKEN A SERVIDOR
          this.http.post(Globales.urlBase + '/token', this.token).subscribe(estatus => {

            this.estatus = estatus
        

            if(this.estatus.success){

              Swal.fire({
                title: 'Notificaciones',
                text: this.estatus.mensaje,
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#ff911e'
              })
  
              
            }else{
              Swal.fire({
                title: 'Notificaciones',
                text: this.estatus.mensaje,
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#ff911e'
              })
            }


            
          })



        },
        (error) => { console.error(error); }
      );
  }

}
