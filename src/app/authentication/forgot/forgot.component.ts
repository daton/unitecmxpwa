import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../../modelo/globales';
import { Estatus } from '../../modelo/estatus';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  estatus:Estatus;


  constructor(private fb: FormBuilder, private router: Router,private http:HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
  }

  onSubmit() {

this.http.post<Estatus>(Globales.urlBase+"/correo",this.form.controls['email'].value).subscribe(
  estatus=>{
    this.estatus=estatus;

    if(this.estatus.success){
      Swal.fire(
     
   this.estatus.mensaje
   
    )
    }else{
      Swal.fire(
     
        this.estatus.mensaje
      
       )
    }
    this.router.navigate(['/authentication/login']);

  }
)


   
  }

  casa(){
    this.router.navigate(["/"], { skipLocationChange: true });
  }
}

  

