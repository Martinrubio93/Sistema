import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../Interfaces/Response-Api";
import { Login } from "../Interfaces/Login";
import { Usuarios } from "../Interfaces/Usuario";

@Injectable({
    providedIn:'root'
})
export class UsuarioServicio{
    private urlApi:string = environment.endpoint + "Usuarios/"
    
    
    constructor(private http:HttpClient){
        
    }

    ///Creamos el metodo para Iniciar Seccion
    IniciarSesion(request: Login):Observable<ResponseApi>
    {
        /// le devolvemos un ResponseApi que es la clase generica y con contactenamos con la url y le pasamos el request
        return this.http.post<ResponseApi>(`${this.urlApi}InicioSesion`,request)
    }
    ///retorna la lista de Usuarios
    Lista():Observable<ResponseApi>
    {
        return this.http.get<ResponseApi>(`${this.urlApi}ListaUsuario`)

    }
    //guardas
    Guardar(request: Usuarios):Observable<ResponseApi>  //Martin puso Login
    {
        /// le devolvemos un ResponseApi que es la clase generica y con contactenamos con la url y le pasamos el request
        return this.http.post<ResponseApi>(`${this.urlApi}CrearUsuario`,request)
    }

    ///Editar Usuario
    EditarUsuario(request: Usuarios):Observable<ResponseApi>
    {
        return this.http.put<ResponseApi>(`${this.urlApi}editar`,request)
    }

    ElimarUsuario(id: number):Observable<ResponseApi>
    {
        return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
    }
}