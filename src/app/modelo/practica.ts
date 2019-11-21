import { Incidencia } from "./incidencia";

export interface Practica {

    id?:number,
idProfesor?: number,
profesor?:string,
clave?:number,
turno?: string,
dia?: number,
campus?:string,
fecha?:string

horario?: string,

lat?: number,
lon?: number,
distancia?:number,
momento?:string
incidencias?: Incidencia[]
}
