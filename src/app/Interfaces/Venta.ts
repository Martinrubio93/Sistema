import { DetalleVenta } from "./DetalleVenta";

export interface Venta{
    idVenta?:number,
    NumeroDeVenta?:string,
    tipoPago:string,
    fechaRegistro?:string,
    totalTexto:string,
    detalleVenta:DetalleVenta[]
}