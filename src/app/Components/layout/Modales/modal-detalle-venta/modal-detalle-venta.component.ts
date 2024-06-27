import { Component, OnInit, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venta } from '../../../../Interfaces/Venta';
import { DetalleVenta } from '../../../../Interfaces/DetalleVenta';



@Component({
  selector: 'app-modal-detalle-venta',
  templateUrl: './modal-detalle-venta.component.html',
  styleUrl: './modal-detalle-venta.component.css'
})
export class ModalDetalleVentaComponent implements OnInit{

fechaRegistro:string = "";
numeroDocumento:string = "";
tipoPago:string = "";
total:string = "";
detalleVenta:DetalleVenta[] = [];
columnasTabla:string[] = ['nombreProducto', 'cantidad', 'precio', 'total'];


// export interface DetalleVenta{
//   idProducto:number,
//   DescripcionAuto: string,
//   cantidad:number,
//   precioTexto:string,
//   totalTexto:string
// }

// export interface Venta{
//   idVenta?:number,
//   numeroDocumento?:string,
//   tipoPago:string,
//   fechaRegistro?:string,
//   totalTexto:string,
//   detalleVenta:DetalleVenta[]
// }




  constructor(@Inject(MAT_DIALOG_DATA) public _venta: Venta) {

this.fechaRegistro = _venta.fechaRegistro!;
this.numeroDocumento = _venta.NumeroDeVenta!;
this.tipoPago = _venta.tipoPago;
this.total = _venta.totalTexto;
this.detalleVenta = _venta.detalleVenta;

  }

ngOnInit(): void {
  
}
}