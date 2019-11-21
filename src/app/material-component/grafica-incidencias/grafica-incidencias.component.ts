import { Component } from '@angular/core';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { single, multi, generateData } from './chartData';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { Incidencia } from '../../modelo/incidencia';
import { HttpClient } from '@angular/common/http';
import { Globales } from '../../modelo/globales';
import swal from 'sweetalert2';


@Component({
  selector: 'app-grafica-incidencias',
  templateUrl: './grafica-incidencias.component.html',
  styleUrls: ['./grafica-incidencias.component.css']
})
export class GraficaIncidenciasComponent {
  simple: any[];


  multi: any[];
  dateData: any[];
  dateDataWithRange: any[];
  range = false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Incidencia';
  showYAxisLabel = true;
  yAxisLabel = 'Ocurrencias';
  showGridLines = true;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 8;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;
  rangeFillOpacity = 0.15;

  colorScheme = {
    domain: ['#e6e600', '#2ECC71', '#ff3333',
     '#ffc65d','#8000ff' ,'#d96557', '#ba68c8', 
     '#1e88e5', '#2ECC71', '#26c6da', '#26c6da',
      '#ffc65d', '#8000ff', '#26c6da', '#2ECC71', '#2ECC71']
  };
  schemeType = 'ordinal';





  mostrarGrafico = false;
  claveProfesor: string

  constructor(private http: HttpClient) {
    this.mostrarGrafico = false;


  }

  graficar() {

    this.mostrarGrafico = false
    this.http.get<any[]>(Globales.urlBase + '/grafica-incidencias/' + this.claveProfesor).subscribe(
      resp => {
      this.simple = resp;
      console.log('Recibidos ' + this.simple.length)
      const single2 = resp
      if (single2.length==0) {
       alert("la clave dek profesor no existe")
      } else {
       // console.log("yaaa " + JSON.stringify(single2))
        Object.assign(this, {
          single2

        });

        this.mostrarGrafico = true
      }
    },
    error=>{
     alert("proporciona una clave");
    }

    )

  }




  select(data) {
    console.log('Haz hecho click en este elemento', data);
  }


}
