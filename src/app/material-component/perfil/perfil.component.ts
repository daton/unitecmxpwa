import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CampoClinico } from '../../modelo/campo-clinico';
import { Globales } from '../../modelo/globales';
import { Perfil } from '../../modelo/perfil';
import { Estatus } from '../../modelo/estatus';
import swal from 'sweetalert2';
import { CustomValidators } from 'ng2-validation';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  //myControl = new FormControl();
  formitaPerfil:FormGroup


  options: string[] = [];
  filteredOptions: Observable<string[]>;
  campos: CampoClinico[] = []
  campoSeleccionado:CampoClinico ={}
  perfil: Perfil = {}
  estatus:Estatus={}
option="gato"
tieneCampo=false

  constructor(private http: HttpClient,private fb: FormBuilder) {

  }
  ngOnInit() {
this.perfil=Globales.perfil
    //La siguiente es para ocultar el campo clinico si no es profesor
    console.log("rol "+this.perfil.rol)

if('profesor'==this.perfil.rol) this.tieneCampo=true

    this.formitaPerfil = this.fb.group({
      fnombre: [
        null,
        Validators.compose([ Validators.required])
      ],
      fpaterno:[
        null,
        Validators.compose([Validators.required])
      ],
      fmaterno:[
        null,
        Validators.compose([Validators.required])
      ],
      fnip:[
        null,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      fcampo:[
        null,
        Validators.compose([Validators.required])
      ],
      femail:[
        null,
        Validators.compose([Validators.required])
      ]

    });





  //  this.myControl.setValue('Topoyiyo');
    this.perfil = Globales.estatusPerfil.perfil;

    console.log('Esto cuando entra siempre' + JSON.stringify(this.perfil))
var valorActual="";
    this.http.get<CampoClinico[]>(Globales.urlBase + '/campos').subscribe(
      res => {
        this.campos = res
        this.campos.forEach(valor => {
          this.options.push(valor.sede);
          if(Globales.estatusPerfil.perfil.idCampoClinico==valor.id){
            valorActual=valor.sede

          console.log("se cumplio la condicion")
          }

          this.formitaPerfil.controls['fcampo'].setValue(valorActual);

        })


        this.filteredOptions = this.formitaPerfil.controls['fcampo'].valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      }
    )




  }//Termina el metodo OnInit

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  actualizarPerfil(){

    this.campos.forEach(valor=>{
    if(this.formitaPerfil.controls['fcampo'].value==valor.sede){
      this.perfil.idCampoClinico=valor.id
    }
    })


    console.log("Opcion seleccioanda"+this.formitaPerfil.controls['fcampo'].value)
    this.http.put<Estatus>(Globales.urlBase+"/perfil",this.perfil).subscribe(
      res=>{
        this.estatus=res

        Swal.fire(this.estatus.mensaje)
      }
    )
  }


}
