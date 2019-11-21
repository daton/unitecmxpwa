import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Globales } from '../../modelo/globales';
import { Practica } from '../../modelo/practica';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ExcelPracticas } from '../../modelo/excel-practicas';
import { ConnectionService } from 'ng-connection-service';
import { BreakpointObserver } from '@angular/cdk/layout';
declare var require: any;
const data: any = require('assets/company.json');
@Component({
  selector: 'app-mi-asistencia',
  templateUrl: './mi-asistencia.component.html',
  styleUrls: ['./mi-asistencia.component.css']
})
export class MiAsistenciaComponent {



  practicas: Practica[] = []
  excelPracticas: ExcelPracticas[] = []

  columns = [{ name: 'Fecha' }, { name: 'Horario' }, { name: 'Momento' }];
  displayedColumns: string[] = ['Fecha', 'Horario', 'Momento'];
  dataSource = new MatTableDataSource(this.excelPracticas)

  @ViewChild(MiAsistenciaComponent, { static: true }) table: MiAsistenciaComponent;
  //dataSource = new MatTableDataSource(this.excelPracticas)
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;


  constructor( private http: HttpClient, breakpointObserver: BreakpointObserver) {
  //El siguiente breakpoint es para hacer responsiva cada fila
  breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
    this.displayedColumns = result.matches ?
    ['Fecha', 'Horario', 'Momento']:
    ['Fecha', 'Horario', 'Momento'];
  });




    this.http.get<Practica[]>(Globales.urlBase + '/practica/profesor/' + Globales.estatusPerfil.perfil.id).subscribe(
      res => {
        this.practicas = res

    
        this.practicas.forEach(valor => {
      

          this.excelPracticas.push({
           'Fecha':valor.fecha,
            'Horario': valor.horario,
            'Momento': valor.momento,
          })

          this.dataSource = new MatTableDataSource(this.excelPracticas);


          setTimeout(()=>{
            this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          },1200)
        })

      }

    )


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
