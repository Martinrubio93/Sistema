import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
///esto se importa para el recibo de la respuesta de la API
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
import { ResponseApi } from "../Interfaces/Response-Api";


@Injectable({
    providedIn:'root'
})
export class VentaServicio{
    private urlApi:string = environment.endpoint + "DashBoard/"
    constructor(private http:HttpClient){
        
    }

    Lista():Observable<ResponseApi>
    {
        return this.http.get<ResponseApi>(`${this.urlApi}ListaAutos`)
    }
}