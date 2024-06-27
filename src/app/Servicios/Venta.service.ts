import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../Interfaces/Response-Api";
import { Login } from "../Interfaces/Login";
import { Usuarios } from "../Interfaces/Usuario";
import { Venta } from "../Interfaces/Venta";
@Injectable({
    providedIn:'root'
})
export class VentaServicio{
    private urlApi:string = environment.endpoint + "Ventas/"
    constructor(private http:HttpClient){
        
    }

    Registar(Ventas:Venta):Observable<ResponseApi>
    {
        return this.http.post<ResponseApi>(`${this.urlApi}Registrar`,Ventas)
    }

    HistorialVenta(BuscarPor:string , NumeroVenta:string, FechaDesde:string, FechaHasta:string):Observable<ResponseApi>
    {
        return this.http.get<ResponseApi>(`${this.urlApi}HistorialVentas?BuscarPor=${BuscarPor}&numeroVenta=${NumeroVenta}&fechaInicio=${FechaDesde}&FechaFin=${FechaHasta}`)
    }

    Reporte(FechaInicio:string, FechaFin:string):Observable<ResponseApi>
    {
        return this.http.get<ResponseApi>(`${this.urlApi}Reporte?FechaInicio=${FechaInicio}&FechaFin${FechaFin}`)
    }

}