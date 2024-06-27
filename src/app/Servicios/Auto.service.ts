
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../Interfaces/Response-Api";
import { Login } from "../Interfaces/Login";
import { Usuarios } from "../Interfaces/Usuario";
import { Auto } from "../Interfaces/Auto";

@Injectable({
    providedIn:'root'
})
export class AutoService{
     private urlApi:string = environment.endpoint + "Autos/"
    constructor(private http:HttpClient){
        
    }

    Lista():Observable<ResponseApi>
    {
        return this.http.get<ResponseApi>(`${this.urlApi}ListaAutos`)

    }

     //guardas
     Login(request: Auto):Observable<ResponseApi>
     {
         /// le devolvemos un ResponseApi que es la clase generica y con contactenamos con la url y le pasamos el request
         return this.http.post<ResponseApi>(`${this.urlApi}CrearAutos`,request)
     }
    ///Editar Usuario
    EditarAuto(Auto: Auto):Observable<ResponseApi>
    {
        return this.http.put<ResponseApi>(`${this.urlApi}editar`,Auto)
    }

    ElimarProducto(id: number):Observable<ResponseApi>
    {
        return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
    }
}