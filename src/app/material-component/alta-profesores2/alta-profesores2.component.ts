import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Estatus } from '../../modelo/estatus';
import { Globales } from '../../modelo/globales';

import { Perfil } from '../../modelo/perfil';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { CampoClinico } from '../../modelo/campo-clinico';

import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EstatusPerfil } from '../../modelo/estatus-perfil';


@Component({
  selector: 'app-alta-profesores2',
  templateUrl: './alta-profesores2.component.html',
  styleUrls: ['./alta-profesores2.component.css']
})
export class AltaProfesores2Component implements OnInit {


  @ViewChild(MatSort,{static: false}) sort: MatSort;


  //Campos del listado
  data: Perfil[] = []
  estatus: Estatus = {}
  dataSource: MatTableDataSource<Perfil>
  displayedColumns = ['nip', 'id', 'nombre', 'email'];
  indiceTab = 0;
sedeDefecto=""

  //Campos del formulario para guardar profe
  formitaPerfil: FormGroup

  //Para mostrar el formulario de agregar
  agregado = false;
  sedeCampo:string
  //Campo clinico que tendran el nuevo profesor, halado del que se selecciono
  campoClinico: CampoClinico = {}

  //options: string[] = [];

  //El siguiente son las opciones del autocomplete, que son las options1 de tutorial
  campos: CampoClinico[] = []

  //El siguiente es para filtrar los campos clinicos
  filteredCamposClinicos: Observable<CampoClinico[]>;

  //E formcontrol de tus camposclinicos
  myControl = new FormControl();


  campoSeleccionado: CampoClinico = {}
  perfil: Perfil = {}
  option = "gato"

  estatusPerfil: EstatusPerfil = {}


  constructor(private http: HttpClient, breakpointObserver: BreakpointObserver, private fb: FormBuilder,

  ) {
    //El siguiente breakpoint es para hacer responsiva cada fila
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['nip', 'id', 'nombre', 'email'] :
        ['nip', 'id', 'nombre', 'email'];
    });


  }
  obtenerProfesores() {
    this.http.get<Perfil[]>(Globales.urlBase + "/perfil/" + Globales.perfil.campus + "/profesor").subscribe(
      data => {
        this.data = data;
        console.log("Profesores dados de alta" + this.data.length)


       
        this.dataSource = new MatTableDataSource(this.data);
        setTimeout(()=>{
       
        this.dataSource.sort = this.sort;
        },1200)
      }
    )
  }

  ngOnInit() {


    this.estatusPerfil = JSON.parse(localStorage.getItem('miEstatusPerfil'))
    Globales.estatusPerfil = this.estatusPerfil
    Globales.perfil = this.estatusPerfil.perfil


    this.obtenerProfesores()



    // TERMINA HASTA AQUI LA GEOLOCALIZACION



    //Termina la parte de inicializacion de los profes encontrados
    //Empieza la validacion de los formularios
    this.formitaPerfil = this.fb.group({

      fid: [
        null,
        Validators.compose([Validators.required])
      ],
      fnombre: [
        null,
        Validators.compose([Validators.required])
      ],
      fpaterno: [
        null,
        Validators.compose([Validators.required])
      ],
      fmaterno: [
        null,
        Validators.compose([Validators.required])
      ],
      fnip: [
        null,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      femail: [
        null,
        Validators.compose([Validators.required])
      ],
    
      fentrada: [
        null,
        Validators.compose([Validators.required])
      ],
      fsalida: [
        null,
        Validators.compose([Validators.required])
      ]



    });

    //CARGAMOS DESDE EL INICIO TODOS LOS CAMPOS
    this.http.get<CampoClinico[]>(Globales.urlBase + "/campos-campus/" + Globales.perfil.campus).subscribe(
      campos => {
        this.campos = campos
        console.log("Al inicio de esta componente todo los campos.. " + this.campos.length)

      this.sedeDefecto=  this.campos[0].sede
      console.log("la sede seleccionada es "+this.sedeDefecto)
      });



    //El siguiente es para filtrar los campos clínicos
    /*    
      this.filteredCamposClinicos = this.myControl.valueChanges.pipe(
        startWith<string | CampoClinico>(''),
        map(value => (typeof value === 'string' ? value : value.sede)),
        map(sede => (sede ? this._filter(sede) : this.campos.slice()))
      );
  
  
     
  
  
    }//TERMINA EL NGiNITI
  
    private _filter(name: string): CampoClinico[] {
      const filterValue = name.toLowerCase();
  
      return this.campos.filter(
        campo =>
          campo.sede.toLowerCase().indexOf(filterValue) === 0
          
        
      );
    }
  */
  }
  modificar(id: number) {
    this.indiceTab = 1
    this.perfil = this.data.find(obj => obj.id == id)
    console.log("Modificaras este id" + id);

if(this.perfil.idCampoClinico!=null){
  console.log("al modificar si existe un campos ya"+this.perfil.idCampoClinico)
  this.sedeDefecto = this.campos.find(obj => obj.id == this.perfil.idCampoClinico).sede
  console.log("La sede campo es "+this.sedeCampo);
  
}
    this.sedeCampo=  this.campos[0].sede
    //document.getElementById("editar").scrollIntoView()
  }

  onTabChanged($event) {
    let clickedIndex = $event.index;
    //Cambiamos al idncieTab al actual esto para recetearlo.
    this.indiceTab = clickedIndex
    console.log("cambio" + clickedIndex);
    if (clickedIndex == 0) {
      this.obtenerProfesores()
    }
    
  }


  //Para agregar un nuevo profesor
  agregar() {
    //Visualizamos el formulario

    this.agregado = true
  }

  guardarProfesor() {
    console.log("vamos a ver el id de sede" + this.perfil.id +"la sede "+  this.sedeCampo)


    this.campoClinico = this.campos.find(obj => obj.sede == this.sedeCampo)
    console.log("Campo clinico seleccionado completo con todo y sede " + JSON.stringify(this.campoClinico))
    this.perfil.idCampoClinico = this.campoClinico.id
    //IMPORTANTE ajusamos el campus del profe estos dosssss
    this.perfil.campus = Globales.perfil.campus
    this.perfil.rol = "profesor"

    console.log(JSON.stringify(this.perfil));

    this.http.post<Estatus>(Globales.urlBase + "/perfil", this.perfil).subscribe(
      estatus => {
      this.estatus = estatus
        console.log("El estatis es " + JSON.stringify(estatus))
        Swal.fire(this.estatus.mensaje)

        this.perfil = {}

      }
    );

    this.obtenerProfesores()

  }

  borrarProfesor(id: number) {
    console.log("Se borrara" + id)
    Swal.fire({
      title: '¿Desea borrar al profesor?',
      text: "Se borrará de forma permanente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff911e',
      cancelButtonColor: '#006fb9',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {


        this.http.delete<Estatus>(Globales.urlBase + "/perfil/" + id).subscribe(
          estatus => {
            this.estatus = estatus
         
            
            Swal.fire(
              'Eliminado',
              this.estatus.mensaje,
              'success'
            )
            this.obtenerProfesores()
          }
        )


      }
    })

  }



}
