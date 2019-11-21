import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Estatus } from "../../modelo/estatus";
import { Globales } from "../../modelo/globales";

import { Perfil } from "../../modelo/perfil";
import { EstatusPerfil } from "../../modelo/estatus-perfil";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
//Para ocultar mostrar password
hide=true
estatusPerfil:EstatusPerfil={};

  rol: string;
  login: string;
  password: string;
  email:string
  mostrarError: boolean = false;
  mostrarErrorEmail=false
  public form: FormGroup;
  
   perfil:Perfil={}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])],
      email:[null, Validators.compose([Validators.email, Validators.required])]
    });
  }

  onSubmit() {
   
    console.log("El valor edel password:"+this.form.get("password").value)
        Globales.perfil.nip= this.form.get("password").value
  console.log("Antes el perfil es "+this.form.get('email').value)
        Globales.perfil.rol=this.rol
        Globales.perfil.email=this.email

        console.log("El valor rol es"+Globales.perfil.rol)
        console.log("El valor edel password:"+Globales.perfil.nip)

this.perfil={
  email:Globales.perfil.email=this.form.get('email').value,

  nip:Globales.perfil.nip= this.form.get("password").value
}
        

      this.http
      .post<EstatusPerfil>(
        Globales.urlBase + "/academico/" ,this.perfil
      )
      .subscribe(respuesta => {this.estatusPerfil = respuesta
      

      if (this.estatusPerfil.success) {
        Globales.perfil=this.estatusPerfil.perfil;
        this.mostrarError = false;
        //Asignamos la variable estatusPerfil
        Globales.estatusPerfil=this.estatusPerfil
   // localStorage.setItem('miPerrito','Floky' );
   localStorage.setItem('miEstatusPerfil',JSON.stringify(Globales.estatusPerfil) );
   //this.estatusPerfil=JSON.parse(localStorage.getItem('miEstatusPerfil'))

   console.log("HOla e objeto guardado es:"+this.estatusPerfil.perfil.nombre)

        console.log('Este es el perfil '+JSON.stringify(Globales.estatusPerfil))
        this.router.navigate(["/material"], { skipLocationChange: true });
      } else {
        this.mostrarError = true;
        this.mostrarErrorEmail=true
        console.log("Errorres");
      }
      
      
      });

   /* setTimeout(() => {
    
      if (this.estatusPerfil.success) {
        Globales.perfil=this.perfil;
        this.mostrarError = false;
        //Asignamos la variable estatusPerfil
        Globales.estatusPerfil=this.estatusPerfil
        console.log('Este es el perfil '+JSON.stringify(Globales.estatusPerfil))
        this.router.navigate(["/starter"], { skipLocationChange: true });
      } else {
        this.mostrarError = true;
      }
    }, 1500);
  */
  }

  recuperar(){
    this.router.navigate(["/authentication/forgot"], { skipLocationChange: true });
  }
}
