import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstatusPerfil } from './modelo/estatus-perfil';
import { Globales } from './modelo/globales';
import { SwUpdate, UpdateAvailableEvent, SwPush } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
// Para online offline: npm i ng-connection-service
import { ConnectionService } from 'ng-connection-service';
import { mergeMap, mergeMapTo } from 'rxjs/operators';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  estatusConexion='EN LINEA'
  estaConectado=true
  token=""
//readonly VAPID_PUBLIC='BBSJlsxCXmf2yiDAvq396aiIjsl-jvn8rsBxnnd3oSvaVLyk0gNpmzuVnxfG355Mlm7jQxP97Tv78meZ003mePc'

  ngAfterViewInit(): void {
   console.log('init inicializado')
   var x=document.referrer;
   console.log('ref',x);

   if(x){
     console.log("pushing estado")
    // let locat=location.href
   //  history.pushState(null,null,locat)
   }




   //ONLINE
   //Checar si online


  }

  estatusPerfil: EstatusPerfil = {}


  constructor(private connectionService: ConnectionService,private router: Router,private swUpdate: SwUpdate
  ) {
//OnLINE
this.connectionService.monitor().subscribe(estaConectado=>{
  this.estaConectado=estaConectado
  if(this.estaConectado){
    this.estatusConexion="EN LINEA"
    Globales.status=this.estatusConexion
    console.log("enlinea")
  }else{
    this.estatusConexion="SIN CONEXION"
    Globales.status=this.estatusConexion
    console.log("fuera de line");
  }
  })
  




    this.estatusPerfil = JSON.parse(localStorage.getItem('miEstatusPerfil'))
    Globales.estatusPerfil = this.estatusPerfil
    if (this.estatusPerfil == null) {
      console.log("NO creado a logearse porque cerraste la sesion");

      // this.router.navigate(['/authentication/login'],{skipLocationChange:true})
      this.router.navigate(['/authentication/login'], { skipLocationChange: true });

    } else {
      console.log("Estas entrando como " + Globales.estatusPerfil.perfil.rol)
     // this.router.navigate(["/material"], { skipLocationChange: true });
     
      console.log("Bienvenido " + this.estatusPerfil.perfil.nombre)
    }

    // servicios de pwa
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        if (confirm('Hola amiguita!, Ya hay una nueva actualización, ¿Deseas descargarla?')) {
          window.location.reload();
        }
      });
    }




  }



}


