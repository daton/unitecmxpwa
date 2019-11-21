
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../../modelo/globales';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Practica } from '../../modelo/practica';
import { ExcelService } from '../excel.service';
import { ExcelPracticas } from '../../modelo/excel-practicas';
import { ThrowStmt } from '@angular/compiler';
import { BreakpointObserver } from '@angular/cdk/layout';
declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-reporte-registro',
  templateUrl: './reporte-registro.component.html',
  styleUrls: ['./reporte-registro.component.css'],
  providers: [ExcelService]
})


export class ReporteRegistroComponent implements AfterViewInit{
  practicas: Practica[] = []
  arreglo:any[]=[]
 

  columns = [{ name: 'fecha' }, { name: 'horario' }, { name: 'momento' },{name:'profesor'}, {name:'clave'}];
  displayedColumns: string[] = ['fecha', 'horario', 'momento','profesor', 'clave'];

  dataSource: MatTableDataSource<Practica>;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;

excelRegistro:ExcelPracticas[]=[]




  ngAfterViewInit(): void {
  
   // this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
  
  }



//para el mapita
zoom = 16;
latitude=19.588952499999998
longitude=-99.0400562
mostrarMapa=false




  exportToExcel() {


    this.excelRegistro=[]
    this.practicas.forEach(valor=>{


      

      this.excelRegistro.push({
        'Fecha':valor.fecha,
        'Horario':valor.horario,
        'Momento':valor.momento,
        'Profesor':valor.profesor,
        'Clave':valor.clave,
        'Lat':valor.lat,
        'Lon':valor.lon,
        'Distancia':valor.distancia
      })
    });

    if(this.practicas.length==0){

      this.excelRegistro.push({
        'Fecha':'',
        'Horario':'',
        'Momento':'',
        'Profesor':'',
        'Clave':null,
        'Lat':null,
        'Lon':null,
        'Distancia':null
      })
      
    }


    this.excelService.exportAsExcelFile(this.excelRegistro, 'practicas');
  }



  constructor(public http:HttpClient,private excelService: ExcelService, breakpointObserver: BreakpointObserver) {
  //El siguiente breakpoint es para hacer responsiva cada fila
  breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
    this.displayedColumns = result.matches ?
    ['fecha', 'horario', 'momento','profesor', 'clave'] :
    ['fecha', 'horario', 'momento','profesor', 'clave'];
  });


 

  let estaUrl: string = Globales.urlBase + "/practica-campus-excel/"+Globales.estatusPerfil.perfil.campus;
  this.http.get<Practica[]>(estaUrl).subscribe(res => {

    this.practicas = res
  
 
  console.log("Practicas recobradas "+this.practicas.length)


      
        this.dataSource = new MatTableDataSource(this.practicas);
       
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(()=>{
          this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
        },1200)
        
        
      })


  console.log("Se carga la tabla por completo")

}






  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  
  }


  verLocalizacion(valor:any){
    this.mostrarMapa=true
    console.log(JSON.stringify(valor))
    this.latitude=valor.lat
    this.longitude=valor.lon
    console.log("Lati "+this.latitude);
    setTimeout(()=>{
      this.mostrarMapa=true
    },300)
  }


  regresarATabla(){
    this.mostrarMapa=false;
  }
}
