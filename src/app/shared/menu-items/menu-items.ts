import { Injectable } from '@angular/core';
import { Globales } from '../../modelo/globales';
import { EstatusPerfil } from '../../modelo/estatus-perfil';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [


  {
    state: 'material',
    name: 'Contenido',
    type: 'sub',
    icon: 'bubble_chart',
   
    children: [
      /*  {state:'subir-videos',name:'Subir videos'},*/
      { state: 'inicio', name: 'Inicio', type: 'link' },
      { state: 'reporte-incidencias', name: 'Reporte incidencias', type: 'link' },
      { state: 'reporte-registro', name: 'Reporte registro', type: 'link' },
    /*  { state: 'grafica-asistencia', name: 'Grafica asistencia', type: 'link' },*/
      { state: 'grafica-incidencias', name: 'Grafica incidencias', type: 'link' },
      { state: 'perfil-admin', name: 'Administrar perfil', type: 'link' },
      { state: 'incidencias', name: 'Incidencias', type: 'link' },


     


    ]
  }

];

//menu coordinador
const MENUITEMS3 = [


  {
    state: 'material',
    name: 'Contenido',
    type: 'sub',
    icon: 'bubble_chart',
  
    children: [
      /*  {state:'subir-videos',name:'Subir videos'},*/
      { state: 'inicio', name: 'Inicio', type: 'link' },
      { state: 'reporte-incidencias', name: 'Reporte incidencias', type: 'link' },
      { state: 'reporte-registro', name: 'Reporte registro', type: 'link' },
    /*  { state: 'grafica-asistencia', name: 'Grafica asistencia', type: 'link' },*/
      { state: 'grafica-incidencias', name: 'Gráfica incidencias', type: 'link' },
      { state: 'perfil-admin', name: 'Perfil', type: 'link' },
     /* { state: 'incidencias', name: 'Incidencias', type: 'link' },*/
      {state:'alta-profesores2', name:'Profesores', type:'link'},
      {state:'campos-clinicos', name:'Campos Clínicos', type:'link'}
  

     


    ]
  }

];


//menu PROFESORES
const MENUITEMS2 = [

  {
    state: 'material',
    name: 'Contenido',
    type: 'sub',
    icon: 'bubble_chart',
   
    children: [
      /*  {state:'subir-videos',name:'Subir videos'},*/
      /*   { state: 'button', name: 'Buttons', type: 'link' },*/
      { state: 'inicio', name: 'Inicio', type: 'link' },
      {state:'asistencia', name:'Asistencia', type:'link'},
      {state:'mi-asistencia', name:'Mis asistencias', type:'link'},
      { state: 'incidencias', name: 'Incidencias', type: 'link' },
     
      { state: 'perfil', name: 'Administrar perfil', type: 'link' }


    ]
  }
];

//Menu direccion campos clinicos
const MENUITEMS4 = [

  {
    state: 'material',
    name: 'Contenido',
    type: 'sub',
    icon: 'bubble_chart',
   
    children: [
      /*  {state:'subir-videos',name:'Subir videos'},*/
      /*   { state: 'button', name: 'Buttons', type: 'link' },*/
      { state: 'inicio', name: 'Inicio', type: 'link' },
      { state: 'perfil-admin', name: 'Administrar perfil', type: 'link' },


    ]
  }
];

@Injectable()
export class MenuItems {
  estatusPerfil:EstatusPerfil={}
  getMenuitem(): Menu[] {

    // se lee aqui tambien sin el menu o se guarda en la sesion
    this.estatusPerfil=JSON.parse(localStorage.getItem('miEstatusPerfil'))
    Globales.perfil=this.estatusPerfil.perfil

//console.log("SE ELIGIRA EL MENUUUUUU"+this.estatusPerfil.perfil.rol);
   
    if(this.estatusPerfil.perfil.rol=='coordinador'){
      return MENUITEMS3;
    }else if(this.estatusPerfil.perfil.rol=='direccion-campos'){
   return MENUITEMS4;
    }
    else{
      return MENUITEMS2;
    }
    


  }
}

