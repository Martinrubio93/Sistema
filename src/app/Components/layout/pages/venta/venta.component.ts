import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { AutoService } from '../../../../Servicios/Auto.service';
import { VentaServicio } from '../../../../Servicios/Venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import { Auto } from '../../../../Interfaces/Auto';
import { Venta } from '../../../../Interfaces/Venta';
import { DetalleVenta } from '../../../../Interfaces/DetalleVenta';
import Swal from 'sweetalert2';



import { NgClass } from '@angular/common';
import { error } from 'console';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
listaAutos:Auto[] = [];
listaAutosFiltro:Auto[] = [];
listaAutosParaVenta:DetalleVenta[] = [];

bloquearBotonRegistrar:boolean = true;

autoSeleccionado!:Auto;           
tipoPagoPorDefecto:string = "Efectivo";
totalPagar:number = 0;

formularioAutoVenta:FormGroup;
columnasTabla:string[] = ['auto','cantidad','precio','total','accion'];
datosDetalleVenta= new MatTableDataSource(this.listaAutosParaVenta);






retornarAutosPorFiltro(busqueda:any):Auto[]{
  const valorBuscado = typeof busqueda === 'string' ? busqueda.toLowerCase() : busqueda.nombre.toLowerCase();



  const resultado = this.listaAutos.filter(item => item.nombre.toLowerCase().includes(valorBuscado));
 

  // console.log('Resultado del filtrado:', resultado);  // Log para ver el resultado del filtrado

    return resultado;

}

constructor(
  private fb:FormBuilder,
  private _autoServicio:AutoService,
  private _ventaServicio:VentaServicio,
  private _utilidadService:UtilidadService
){

this.formularioAutoVenta = this.fb.group({        //aca se crea el formulario
  auto:['',Validators.required],
  cantidad:['',Validators.required],
  
});

this._autoServicio.Lista().subscribe({
  next:(data)=>{
    if(data.status){
     const lista = data.value as Auto[];
    //  console.log('Autos sin filtrar:', lista); trae la lista de autos
     this.listaAutos = lista.filter(p=>p.esActivo == 1 && p.stock > 0);
      // console.log('Autos filtrados:', this.listaAutos);   //funciona esta linea
    }
  },
  error:(error)=>{

console.error("Error fetching autos", error)

  }
  })


 this.formularioAutoVenta.get('auto')?.valueChanges.subscribe(value => {
 
  this.listaAutosFiltro = this.retornarAutosPorFiltro(value); //retorna la lista de auto dependiendo lo que este rentornando
 


  

  
 })


}

ngOnInit():void{}


//evento para mostrar el producto seleccionado

mostrarAuto(auto:Auto):string{
  return auto.nombre;
 
}

autoParaVenta(event:any){
  this.autoSeleccionado = event.option.value;

  
}

agregarAutoParaVenta(){
  const _cantidad:number = this.formularioAutoVenta.value.cantidad;
  const _precio:number = parseFloat(this.autoSeleccionado.precio);
  const _total:number = _cantidad * _precio;
  this.totalPagar = this.totalPagar + _total;

  this.listaAutosParaVenta.push({
    idAutos:this.autoSeleccionado.idAutos,       //va IdAutos o IdProducto
    descripcionAuto:this.autoSeleccionado.nombre,
    cantidad:_cantidad,
    precioTexto:String(_precio.toFixed(2)),
    totalTexto:String(_total.toFixed(2))


    
  })
 
this.datosDetalleVenta = new MatTableDataSource(this.listaAutosParaVenta);
this.formularioAutoVenta.patchValue({
  auto:'',
  cantidad:''
})

console.log('Lista de autos para venta:', this.listaAutosParaVenta);

}

eliminarAuto(detalle:DetalleVenta){

  this.listaAutosParaVenta = this.listaAutosParaVenta.filter(p=>p.idAutos != detalle.idAutos);

  console.log(detalle.idAutos)


  this.totalPagar = this.totalPagar - parseFloat(detalle.totalTexto);
  this.datosDetalleVenta = new MatTableDataSource(this.listaAutosParaVenta);

  console.log('Lista de autos para venta: se elimina 1', this.listaAutosParaVenta );
}


registrarVenta(){
  if(this.listaAutosParaVenta.length > 0){
   this.bloquearBotonRegistrar = true;
   const request:Venta = {
    tipoPago:this.tipoPagoPorDefecto,
    totalTexto:String(this.totalPagar.toFixed(2)),
    detalleVenta:this.listaAutosParaVenta
   }
    this._ventaServicio.Registar(request).subscribe({
      next:(response) => {
        if(response.status){
          this.totalPagar = 0.00;
          this.listaAutosParaVenta = [];
          this.datosDetalleVenta = new MatTableDataSource(this.listaAutosParaVenta);
        
        Swal.fire({
          icon:'success',
          title:'Venta Registrada!',
          text:`La venta fue registrada con exito ${response.value.numeroDocumento}`


        })
        }else
        this._utilidadService.mostrarAlerta("No se pudo registrar la venta","Error!");
      },

      complete:()=>{
        this.bloquearBotonRegistrar = false;
        
      },
      error:(e)=>{}


    });
  }
  
}

}
