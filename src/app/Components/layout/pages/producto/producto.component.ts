import { Component, OnInit, AfterViewInit, ViewChild,  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { Auto } from '../../../../Interfaces/Auto';
import { AutoService } from '../../../../Servicios/Auto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements AfterViewInit{
  columnasTabla:string[] = ['nombre','categoria','stock','precio','estado','acciones'];
  dataInicio:Auto[] = [];
  dataListaProductos= new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!:MatPaginator;
  
  
  
  
  
    constructor(
      private diaglog:MatDialog,
      private _autoServicio:AutoService,
      private _utilidadService:UtilidadService
    ){}

    
  obtenerProductos(){
    this._autoServicio.Lista().subscribe({
      next:(data)=>{
        if(data.status){
     this.dataListaProductos.data=data.value;
        }else{
          this._utilidadService.mostrarAlerta("No se encontraron datos","Opps!");
        }
      },
      error:(error)=>{}
      })
    
    
    }
    ngOnInit():void{
      this.obtenerProductos();
    }

    ngAfterViewInit():void{
      this.dataListaProductos.paginator = this.paginacionTabla;
    }

    aplicarFiltroTabla(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataListaProductos.filter = filterValue.trim().toLowerCase();
      
      
      }


      nuevoProducto(){
  this.diaglog.open(ModalProductoComponent,{
disableClose:true,

  }).afterClosed().subscribe(resultado =>{
    if(resultado =="true"){
      this.obtenerProductos();   //pintar nuestros productos en la tabla
    }
  });
}


editarProducto(auto:Auto){
  this.diaglog.open(ModalProductoComponent,{
disableClose:true,
data:auto

  }).afterClosed().subscribe(resultado =>{
    if(resultado =="true"){
      this.obtenerProductos();
    }
  });


  }

  eliminarProducto(auto:Auto){
    Swal.fire({
      title:'¿Estas seguro de eliminar este producto?',
      text:auto.nombre,
      icon:"warning",
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si,eliminar!",
      showCancelButton:true,
      cancelButtonColor:"#d33",
      cancelButtonText:"No, volver"
    }).then((resultado)=>{

      if(resultado.isConfirmed){

  this._autoServicio.ElimarProducto(auto.idAutos).subscribe({
    next:(data)=>{
      if(data.status){
        this._utilidadService.mostrarAlerta("El producto fue eliminado","Listo!");
        this.obtenerProductos();
      }else
      this._utilidadService.mostrarAlerta("No se pudo eliminar el producto","Error!");
      
        },
        error:(error)=>{}
      
  })
   
}
  })
   }




}
