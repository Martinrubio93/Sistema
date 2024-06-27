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
export class CategoriaServicio{
    private urlApi:string = environment.endpoint + "Categoria/"
    constructor(private http:HttpClient){
        
    }

    Lista():Observable<ResponseApi>
    {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)

    }
}