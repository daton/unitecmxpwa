import { Proyeccion } from "./proyeccion";
import { Incidencia } from "./incidencia";

export interface Academico {

    nip?:number
    rol?:string
    nombre?:string
    paterno?:string
    materno?:string
    proyeccion?:Proyeccion
    incidencias?:Incidencia[]

}
