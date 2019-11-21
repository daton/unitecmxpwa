import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../../modelo/globales';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


import { Practica } from '../../modelo/practica';
import { Academico } from '../../modelo/academico';
import { Incidencia } from '../../modelo/incidencia';
import { Perfil } from '../../modelo/perfil';
import { ExcelService } from '../excel.service';
import { Http, ResponseContentType } from '@angular/http';
import { ExcelIncidencias } from '../../modelo/excel-incidencias';
import { Estatus } from '../../modelo/estatus';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
declare var require: any;

@Component({
  selector: 'app-reporte-incidencias',
  templateUrl: './reporte-incidencias.component.html',
  styleUrls: ['./reporte-incidencias.component.css'],
  providers: [ExcelService]
})
export class ReporteIncidenciasComponent implements OnInit {
  displayedColumns = ['nombre', 'campus', 'fecha', 'idProfesor', 'nombreProfesor', 'semaforo'];
  dataSource: MatTableDataSource<ExcelIncidencias>;

  esVisible = false;
  estatus: Estatus = {}
  incidencias: Incidencia[] = [];
  excelIncidencias: ExcelIncidencias[] = []
  semaforo: string

  valores: string[] = ['verde', 'ambar', 'rojo'];
  miIncidencia: Incidencia = {}

  perfil: Perfil = {}
  color = 'blue'
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit(): void {

  }

  exportToExcel() {

    this.excelIncidencias = []
    this.incidencias.forEach(valor => {


      //Cambiamos la echa a formato dia/mes/año
      // var xxx= valor.fecha.split('-');
      //  var dma=xxx[2]+"/"+xxx[1]+"/"+xxx[0];

      this.excelIncidencias.push({

        'Incidencia': valor.nombre,
        'Campus': valor.campus,
        'Fecha': valor.fecha,
        'Clave': valor.idProfesor,


        'Nombre': valor.nombreProfesor,

        'Semaforo': valor.semaforo
      })


      console.log("Despues de agregar " + this.incidencias.length)
    })





    if (this.excelIncidencias.length == 0) {
      this.excelIncidencias.push({
        'Incidencia': '',
        'Campus': '',
        'Fecha': '',
        'Clave': null,
        'Nombre': '',
        'Semaforo': ''
      })
    }

    this.excelService.exportAsExcelFile(this.excelIncidencias, 'incidencias');
  }



  constructor(public http: HttpClient, private excelService: ExcelService,
    public http2: Http, breakpointObserver: BreakpointObserver) {

    //El servicio de los acomodos de columnas
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['nombre', 'campus', 'fecha', 'idProfesor', 'nombreProfesor', 'semaforo'] :
        ['nombre', 'campus', 'fecha', 'idProfesor', 'nombreProfesor', 'semaforo'];
    });

    var algo = 'nose '

    this.excelService = excelService;
    this.perfil = {
      campus: Globales.estatusPerfil.perfil.campus,

    }

    let estaUrl: string = Globales.urlBase + "/incidencias";
    console.log("La es esta  url" + estaUrl);
    this.http.post<Incidencia[]>(estaUrl, Globales.estatusPerfil).subscribe(respuesta => {

      this.incidencias = respuesta

      //  this.dataSource = new MatTableDataSource(this.incidencias);
      console.log("Las incidencias son " + this.incidencias.length)
      // Assign the data to the data source for the table to render




      //Cambiamos la echa a formato dia/mes/año
      // var xxx= valor.fecha.split('-');
      //  var dma=xxx[2]+"/"+xxx[1]+"/"+xxx[0];



      this.dataSource = new MatTableDataSource(this.incidencias);


      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 1200)

      console.log("Despues de agregar " + this.incidencias.length)

      console.log(JSON.stringify(this.incidencias))

    });




  }





  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  jaja(valor: string) {
    console.log('Haz hecho click en ' + valor);
  }


  //ASIGNAMOS EL SEMAFORO
  obtenerFila(incidencia: Incidencia) {
    console.log("el id seleccionado  es " + JSON.stringify(incidencia));
    this.miIncidencia = incidencia;
    //Asignamos el semaforo
    incidencia.semaforo = this.semaforo
    this.esVisible = true


  }
  //EL SEMAFORO A ENVIAR
  asignarSemaforo() {
    console.log("El semaforo es" + this.semaforo);
    this.miIncidencia.semaforo = this.semaforo;
    //enviamos a http
    this.http.put<Estatus>(Globales.urlBase + "/incidencias", this.miIncidencia).subscribe(respuesta => {
      this.estatus = respuesta
      console.log("estatus " + this.estatus.mensaje)

 

      //Hacemos el request nuevamente
      let estaUrl: string = Globales.urlBase + "/incidencias";
      console.log("La es esta  url" + estaUrl);
      this.http.post<Incidencia[]>(estaUrl, Globales.estatusPerfil).subscribe(respuesta => {

        this.incidencias = respuesta

        this.dataSource = new MatTableDataSource(this.incidencias);


      })




   


      setTimeout(() => {

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

     //Dialogo para el semaforo

     Swal.fire({
      title: 'Semáforo',
      text: this.estatus.mensaje,
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#ff911e'
    })


      }, 1200)

    })



    this.esVisible = false
  }

}

