import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Estatus } from '../../modelo/estatus';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Globales } from '../../modelo/globales';
import { CampoClinico } from '../../modelo/campo-clinico';
import Swal from 'sweetalert2';
import { EstatusPerfil } from '../../modelo/estatus-perfil';

@Component({
  selector: 'app-campos-clinicos',
  templateUrl: './campos-clinicos.component.html',
  styleUrls: ['./campos-clinicos.component.css']
})
export class CamposClinicosComponent implements OnInit {


  estatusPerfil:EstatusPerfil={}
  //CReamos la forma que contiene el formulario que contedra la validacion
  formitaCampo:FormGroup

  campo:CampoClinico={}
  indiceTab=0;

  //Datos de la tabla de campos clinicios
   //Campos del listado
   data:CampoClinico[]=[]
   estatus:Estatus={}
   dataSource:MatTableDataSource<any>
   displayedColumns = ['id', 'campus', 'sede', 'direccion'];





  //Localizacion mapa

  altaCampoClinico=false
  tablaCampos=true
  
latitude: number;
longitude:number;
zoom:number;
address: string="Ecatepec, México";
private geoCoder;
res:any={}

@ViewChild('search',{static:false} )
public searchElementRef: ElementRef;



//Maps api key geoloca
apiKey="AIzaSyC-HP1yuc34x-fkhEWpD_ZnGN2VVH7GP1I"

//Direccion a buscar
miDireccion:string



//LA VAARIABLE DEL CAMPO CLINICO
campoClinico:CampoClinico={}

//Boton Actualizar deshabilitado
actualizarDeshabilitado=true


//CONSTRRUCTOR
  constructor( private mapsAPILoader: MapsAPILoader,private http:HttpClient,
    private ngZone: NgZone,breakpointObserver: BreakpointObserver, private fb: FormBuilder) {

      //El siguiente breakpoint es para hacer responsiva cada fila
      breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        this.displayedColumns = result.matches ? 
        ['id', 'campus', 'sede', 'direccion']: 
        ['id', 'campus', 'sede', 'direccion'];
      });

     }

  ngOnInit() {

    this.estatusPerfil=JSON.parse(localStorage.getItem('miEstatusPerfil'))
    Globales.estatusPerfil=this.estatusPerfil
    Globales.perfil=this.estatusPerfil.perfil

//Aqui empieza el GET de toodos los campos clínicos





//Comienza la inicializacion del formlario

this.formitaCampo = this.fb.group({
  fsede: [
    null,
    Validators.compose([ Validators.required])
  ],
  fdirector:[
    null,
    Validators.compose([Validators.required])
  ],
  fcorreo:[
    null,
    Validators.compose([Validators.required])
  ],
  fdireccion:[
    null,
    Validators.compose([Validators.required])
  ],
  flat:[
    null,
    Validators.compose([Validators.required])
  ],
  flon:[
    null,
    Validators.compose([Validators.required])
  ]

});


//termina la inicializacion del fromulario


    //LO SIGUIENTE ES PARA LOS MAPAS Y GEOLOCALIZACION
    this.setCurrentLocation();

//load Places Autocomplete
this.mapsAPILoader.load().then(() => {
  this.setCurrentLocation();
  this.geoCoder = new google.maps.Geocoder();
//  var geocoder = new google.maps.Geocoder();

  let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    types: ["address"]
  });


  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      //set latitude, longitude and zoom
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.zoom = 18;
    });
  });
});


this.obtenerCamposClinicos();


  } //Termina  el método OnInit()


  
  // PUROS METODOS PARA GEOLOCALIZAIO Y PARA MAPAS
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        //
        this.campo.lat=this.latitude
        this.campo.lon=this.longitude
        
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;

         this.campo.lat=this.latitude
        this.campo.lon=this.longitude
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
          this.campo.direccion=this.address
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
  

  buscarDireccion(){

    //Habilitamos el boton
    this.actualizarDeshabilitado=false

this.http.get<any>("https://maps.googleapis.com/maps/api/geocode/json?address="+this.miDireccion+"&key="+this.apiKey).subscribe
(res=>{
this.res=res
console.log(JSON.stringify(this.res))

console.log("ha buscae")
this.latitude=this.res.results[0].geometry.location.lat
this.longitude=this.res.results[0].geometry.location.lng
//this.zoom = 19;
this.getAddress(this.latitude, this.longitude);

})


  }


  //EditarCampo Clinico
  modificarCampo(id:string){

   
    this.campoClinico.id=id;
    this.campoClinico=this.data.find(obj=>obj.id==id)

    console.log("Modificaras este id"+ id+" para saber que son iguls "+this.campoClinico.id);
    this.miDireccion=this.campoClinico.direccion
    console.log("el campo clinico es"+JSON.stringify(this.campoClinico))

//  Vemos la direccion


    
  // document.getElementById("editar").scrollIntoView()

  
  }

  //Actualizar el campos clinico
  actualizarCampoClinico(){
this.altaCampoClinico=false;
this.tablaCampos=true;
    this.campoClinico.lat=this.latitude
    this.campoClinico.lon=this.longitude

    this.http.put<Estatus>(Globales.urlBase+"/campos",this.campoClinico).subscribe(
      estatus=>{
        this.estatus=estatus
          Swal.fire(this.estatus.mensaje)
          console.log("El campos clinico a enviarse es "+JSON.stringify(this.campoClinico))
      } )

  //Tambien volvemos a deshabilitar el boton de actulizar, primeo debe de buscarse en el mapa
  this.actualizarDeshabilitado=true

  }


  //Filtros
   
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  
  //Guardar campos
  guardarCampos(){

    //Ajustamos el campo clinico
    this.campo.campus=Globales.perfil.campus

    this.http.post<Estatus>(Globales.urlBase+"/campos", this.campo).subscribe(
      estatus=>{
this.estatus=estatus

        Swal.fire( this.estatus.mensaje )
        this.campo={}
      }
    )

  }



obtenerCamposClinicos(){
  this.http.get<CampoClinico[]>(Globales.urlBase+"/campos-campus/"+Globales.perfil.campus).subscribe(
    data=>{
      this.data=data;
   
  
      
  this.dataSource = new MatTableDataSource<any>(data);
    }
  )
  
 
}



onTabChanged($event) {
  let clickedIndex = $event.index;
  //Cambiamos al idncieTab al actual esto para recetearlo.
  this.indiceTab=clickedIndex
  console.log("cambio"+clickedIndex);
  if(clickedIndex==0){
    this.obtenerCamposClinicos();
  }
}



//Borrar Campo clínico
borrarCampoClinico(id:number){
  console.log("Se borrara"+id)
  Swal.fire({
    title: 'Advertencia',
    text: "Se borrará permantemente este campo clínico, asegúrese antes de cambiar a los profesores asociados al mismo.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff911e',
    cancelButtonColor: '#006fb9',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, borrarlo'
  }).then((result) => {
    if (result.value) {


this.http.delete<Estatus>(Globales.urlBase+"/campos/"+id).subscribe(
estatus=>{
  this.estatus=estatus
  this.obtenerCamposClinicos()
Swal.fire(
        'Eliminado',
        this.estatus.mensaje,
        'success'
      )})

     
    }
  })

}


modificar(id:string){
  this.indiceTab=1
  this.campo=this.data.find(obj=>obj.id==id)
  this.miDireccion=this.campo.direccion
  this.buscarDireccion()
  console.log("Modificaras este id maloooo"+ id);
  //document.getElementById("editar").scrollIntoView()
}

}
