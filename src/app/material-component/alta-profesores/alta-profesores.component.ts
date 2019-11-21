import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../../modelo/globales';
import { Estatus } from '../../modelo/estatus';
import Swal from 'sweetalert2';
//import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-alta-profesores',
  templateUrl: './alta-profesores.component.html',
  styleUrls: ['./alta-profesores.component.css']
})
export class AltaProfesoresComponent implements OnInit{
data:any[]=[]
estatus:Estatus={}
  constructor(private http:HttpClient){
    
  }
  ngOnInit() {
    this.http.get<any[]>(Globales.urlBase+"/perfil/"+Globales.perfil.campus+"/profesor").subscribe(
      data=>{
        this.data=data;
      }
    )
  }
  settings = {
    delete: {

      deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>',
      confirmDelete: true,

 
    },
    add: {
      addButtonContent:'Nuevo profesor',
      createButtonContent: '<i class="ti-save text-primary m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>',
      confirmSave: true,
    },
    columns: {
      id:{
      title:'Clave prof.', filter:false
      },
   
      nip: {
        title: 'NIP',filter:false
      },
      nombre: {
        title: 'Nombre',filter:false
      },
      email: {
        title: 'Email',filter:false
      },
    },
  };


  //Aqui en este caso como ya existe los datos no es el atributo newData sino: data
  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Está seguro que desea borrar éste profesor?')) {
      event.confirm.resolve();
      console.log("Porque ese no esta bien "+event.data);
      
      this.http.delete<Estatus>(Globales.urlBase+"/perfil/"+event.data.id).subscribe(
        estatus=>{this.estatus=estatus
        console.log("El estatis es "+JSON.stringify(estatus))
        Swal.fire(
     
          this.estatus.mensaje
       
        )
        }
      );
      
    
    } else {
      event.confirm.reject();
    }
  }


  //Para recien crear
  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);
    console.log("para guardar"+event.newData)
    event.newData.campus=Globales.perfil.campus;
    event.newData.rol='profesor'

    this.http.post<Estatus>(Globales.urlBase+"/perfil", event.newData).subscribe(
      estatus=>{this.estatus=estatus
      console.log("El estatis es "+JSON.stringify(estatus))
      Swal.fire(
     
        this.estatus.mensaje
     
      )
      
      }
    );

  }

  //Para actualizar
  onSaveConfirm(event) {
    console.log("Edit Event In Console")
   // console.log(event);
   console.log(event.newData)
this.http.put<Estatus>(Globales.urlBase+"/perfil", event.newData).subscribe(
  estatus=>{this.estatus=estatus
  console.log("El estatis es "+JSON.stringify(estatus))
  Swal.fire(
     
    this.estatus.mensaje
 
  )
  }
);

  }
}

 

