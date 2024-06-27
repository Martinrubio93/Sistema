import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../Interfaces/Response-Api";
import { Login } from "../Interfaces/Login";
import { Usuario } from "../Interfaces/Usuario";


@Injectable({
    providedIn:'root'
})
export class MenuServicio{
    private urlApi:string = environment.endpoint + "Menu/"
    constructor(private http:HttpClient){
        
    }
    Lista(id:number):Observable<ResponseApi>
    {
        return this.http.get<ResponseApi>(`${this.urlApi}ListaMenus?idUsuario=${id}`)

    }
}