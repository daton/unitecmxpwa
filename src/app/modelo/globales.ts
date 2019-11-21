import { Academico } from "./academico";
import { Director } from "./director";
import { Perfil } from "./perfil";
import { Estatus } from "./estatus";
import { EstatusPerfil } from "./estatus-perfil";

export class Globales {

 public static urlBase="https://daton.herokuapp.com/api";
 //La siguiente URL es cuando se pone en produccion con tomcat MO PROBAR EN DEVELOPMENT, para ello es
 // solamente "/api" a la antiguita no con github  via heroku
 //public static urlBase="/api";
//public static urlBase: string = "http://192.168.100.85:8080/api";
//public static urlBase: string = "https://con-maven.azurewebsites.net/api";

//public static urlBase: string = "http://192.168.100.85:8090/api";

    public static perfil?:Perfil={}
    public static estatusPerfil:EstatusPerfil={}

    //Para la conectividad
    public static status?:string
    public static estaConectado?:boolean

    //Para lo momentots
    public static segundoMomento?:boolean =true
    public static tercerMomento?:boolean =true

}
