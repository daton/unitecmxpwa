import { Academico } from "./academico";

export interface Director {

    nip?:number
    nombre?:string
    paterno?:string
    materno?:string

    academico?:Academico[]
}
