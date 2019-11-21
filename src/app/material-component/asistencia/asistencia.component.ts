import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../../modelo/perfil';
import { Globales } from '../../modelo/globales';
import { Practica } from '../../modelo/practica';
import { Estatus } from '../../modelo/estatus';
import swal from 'sweetalert2';
import { ConnectionService } from 'ng-connection-service';
import Swal from 'sweetalert2';
import { Momentos } from '../../modelo/Momentos';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})


/* ******************************************************************
GEOLOCALIZACION BASADA EN:
https://www.freakyjolly.com/angular-7-6-add-google-maps-in-angular-2-plus-applications-using-angular-google-maps-module-agm-core-easily/

**********************************************************************************/
export class AsistenciaComponent implements OnInit {

  //Online
  estatusConexion = "enlinea"
  estaConectado = true
  malo = "hola"
  enLinea = "En linea"

 

  momentos: Momentos = {}

  segundoMomento: boolean;
  tercerMomento: boolean;


  d: Date = new Date(); // b
  perfil: Perfil = {}
  practica: Practica = {}
  estatus: Estatus = {}

  latitude: number;
  longitude: number;
  zoom: number;
  status: string = "no"
  miEntrada = Globales.perfil.entrada
  miSalida = Globales.perfil.salida

  miPerfil: Perfil = {}


  leerMomentos(){
    this.momentos = JSON.parse(localStorage.getItem('miMomentos'))
    if (this.momentos != null) {
      console.log("Ya existe bd momentos, entoces ya e hizo un chequeo")
    
       this.momentos.primerMomento=false;

       localStorage.setItem('miMomentos', JSON.stringify(this.momentos));
     

   
    }else{
//Si no existe por primer vez la creamos
this.momentos={}
//Ajustamos los valores de seguno y tercero a true
this.momentos.segundoMomento=true;
this.momentos.tercerMomento=true;
this.momentos.primerMomento=false
//Lo guardamos  POR PRIMERA VEZ
      localStorage.setItem('miMomentos', JSON.stringify(this.momentos));



    }


  }
  ngOnInit(): void {
    this.miPerfil = Globales.estatusPerfil.perfil

    //Invocamos el leerMomentos y que Dios nos agarre confesados
    this.leerMomentos()

 

    console.log("El navegador es " + navigator.appName);

    if (navigator.onLine) {
      this.enLinea = "En linea"
    }
    if (!navigator.onLine) {
      console.log("Sin conexion")
    }


    this.connectionService.monitor().subscribe(estaConectado => {
      console.log("este en que momento sale")
      this.estaConectado = estaConectado
      if (this.estaConectado) {
        this.estatusConexion = " En línea"
        this.enLinea = "En linea"

        //   console.log("enlinea")
      } else {
        this.estatusConexion = " Sin conexión"
        this.enLinea = "Sin conexion"

        //console.log("fuera de line");
      }
    })







  }//Termina el OnInit


  constructor(private connectionService: ConnectionService, public http: HttpClient, ) {
    this.status = Globales.status


    //Online
    //OnLINE
    this.connectionService.monitor().subscribe(estaConectado => {
      console.log("este en que momento sale")
      this.estaConectado = estaConectado
      if (this.estaConectado) {
        this.estatusConexion = " En línea"

        //   console.log("enlinea")
      } else {
        this.estatusConexion = " Sin conexión"

        //console.log("fuera de line");
      }
    })


    //Checamos los momentos antes al hacer el refresh

    if (typeof this.momentos.primerMomento == 'undefined') this.momentos.primerMomento = false;
    if (typeof this.momentos.segundoMomento == 'undefined') this.momentos.segundoMomento = false;
    if (typeof this.momentos.tercerMomento == 'undefined') this.momentos.tercerMomento = false;
    console.log("Al refresh primero " + this.momentos.primerMomento)
    console.log("Al refresh segundo " + this.momentos.segundoMomento)
    console.log("Al refresh tercero " + this.momentos.tercerMomento)



  }
  valor: any
  chequin(valorMomento: string) {
    // this.http.post<any>('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB9X5NDFOiAXjza7Lygg8omtqpkUSmyZaQ', null)
    //  .subscribe(respuesta => {
    //  this.valor = respuesta

    //Los guardamos


    if (valorMomento == 'checkin') {

 
      //Asignamos al segundo momento de la base de datos
      this.momentos.segundoMomento=false
//Lo guardamos
      localStorage.setItem('miMomentos', JSON.stringify(this.momentos));

    

    }

    if (valorMomento == 'checkstay') {

       
         //Asignamos al segundo momento de la base de datos
         this.momentos.tercerMomento=false
   //Lo guardamos
         localStorage.setItem('miMomentos', JSON.stringify(this.momentos));
   
       
   
    }
    if (valorMomento == 'checkout') {


      //localStorage.removeItem("misMomentos")

      this.momentos.primerMomento = false
      this.momentos.segundoMomento = true
      this.momentos.tercerMomento =true

      localStorage.setItem('miMomentos', JSON.stringify(this.momentos));

    }
    this.perfil = Globales.estatusPerfil.perfil
    this.practica.idProfesor = this.perfil.id
    //  console.log("antes  lat:"+respuesta.location.lat)


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        //No comporemetemos a hora a enviar la hora y la fecha

        const date = new Date();

        let fecha = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) +
          '/' + date.getFullYear();

        let horario = date.getHours() + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes()));

        this.practica = {
          idProfesor: this.perfil.id,
          fecha: fecha,
          horario: horario,
          //  lat: respuesta.location.lat,
          // lon: respuesta.location.lng,
          lat: this.latitude,
          lon: this.longitude,
          momento: valorMomento
        }


        this.http.post<Estatus>(Globales.urlBase + '/practica', this.practica)
          .subscribe(respuesta => {
            this.estatus = respuesta

            //  console.log("La práctica" + JSON.stringify(this.practica))
            // console.log("La posicion" + JSON.stringify(respuesta))
            console.log("Respuesta de servidor " + this.estatus.mensaje)

            
            if(this.estatus.success){

              Swal.fire({
                title: 'Asistencia',
                text: this.estatus.mensaje,
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#ff911e'
              })
  
              
            }else{
              Swal.fire({
                title: 'Asistencia',
                text: this.estatus.mensaje,
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#ff911e'
              })
            }


          })



      });


    }
  }


  // PUROS METODOS PARA GEOLOCALIZAIO Y PARA MAPAS
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log("latiiiiiii:" + this.latitude)



      });
    }
  }

  probarConexion() {
    if (navigator.onLine) {
      console.log("Estas en linea")
    }
    if (!navigator.onLine) {
      console.log("estas desconectado")
    }

  }

  //Cheamos los momentos




}
