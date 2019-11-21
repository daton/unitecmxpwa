import { Component, OnInit } from '@angular/core';
import { Globales } from '../../modelo/globales';
import { Perfil } from '../../modelo/perfil';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Estatus } from '../../modelo/estatus';
import Swal from 'sweetalert2';

import { CampoClinico } from '../../modelo/campo-clinico';

import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {

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
//Perfiles

  constructor(private http: HttpClient,private fb: FormBuilder) {

  }
  ngOnInit() {
this.perfil=Globales.perfil
    //La siguiente es para ocultar el campo clinico si no es profesor
    console.log("rol "+this.perfil.rol)



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
      femail:[
        null,
        Validators.compose([Validators.required])
      ],

    });





  //  this.myControl.setValue('Topoyiyo');
    this.perfil = Globales.estatusPerfil.perfil;

    console.log('Esto cuando entra siempre' + JSON.stringify(this.perfil))
var valorActual="";
  




  }

  

  actualizarPerfil(){

   


    this.http.put<Estatus>(Globales.urlBase+"/perfil",this.perfil).subscribe(
      res=>{
        this.estatus=res

        if(this.estatus.success){
          Swal.fire(
     
            this.estatus.mensaje
            
             )
        }else{
          Swal.fire(
     
            "No se pudo actualizar el perfil, intente más tarde"
            
             )
        }
      }
    )
  }

  cancelar(){
 
  }
}
