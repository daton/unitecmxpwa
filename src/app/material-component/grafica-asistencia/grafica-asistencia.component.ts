import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grafica-asistencia',
  templateUrl: './grafica-asistencia.component.html',
  styleUrls: ['./grafica-asistencia.component.css']
})
export class GraficaAsistenciaComponent implements OnInit {
  /*
  title: string = 'Localizacion';
usuarios:any[]=[]
  marcadores:any[]=[]
  zoom=18
*/

  constructor(public http:HttpClient) { }

  ngOnInit() {
/*
    this.http.get<any[]>('https://daton1903.herokuapp.com/api/usuario')
    .subscribe(respuesta=>{
      this.usuarios=respuesta
      console.log("Totales "+this.usuarios.length)






      this.usuarios.forEach(element => {
        if(element.localizacion!=null){
          this.marcadores.push({'lat':element.localizacion.lat, 'lon':element.localizacion.lon,"nombre":element.nombre})
        }
      });
      console.log("total de marcadores "+JSON.stringify(this.marcadores))
    })
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  */
}

}
