
import { Component, Inject,OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria} from '../../../../Interfaces/Categoria';
import { CategoriaServicio } from '../../../../Servicios/Categoria.service';
import { Auto } from '../../../../Interfaces/Auto';
import { AutoService } from '../../../../Servicios/Auto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';






@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrl: './modal-producto.component.css'
})
export class ModalProductoComponent implements OnInit {
  formularioProducto:FormGroup;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaCategorias:Categoria[]=[];


  constructor( 
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto:Auto,
    private fb:FormBuilder,
    private _categoriaServicio:CategoriaServicio,
    private _autoServicio:AutoService,
    private _utilidadService:UtilidadService
  ) { 


this.formularioProducto = this.fb.group({
nombre:['',[Validators.required]],
idCategoria:['',[Validators.required]],
stock:['',[Validators.required]],
precio:['',[Validators.required]],
EsActivo:['1',[Validators.required]],
});

if(this.datosProducto !=null){   //si se obtiene el producto/auto
  this.tituloAccion="Editar";
  this.botonAccion="Actualizar";
  }


this._categoriaServicio.Lista().subscribe({   //obtenemos la lista de cateogorias
  next:(data)=>{
    if(data.status){
      this.listaCategorias = data.value;
      
    }
  },
  error:(error)=>{}
  })



}




ngOnInit():void{  //para setear los valores dentro de los campos de formulario. Los mismos que en el Autot.ts
 if(this.datosProducto!=null){
   this.formularioProducto.patchValue({
     nombre:this.datosProducto.nombre,
     idCategoria:this.datosProducto.idCategoria,
     stock:this.datosProducto.stock,
     precio:this.datosProducto.precio,
     EsActivo:this.datosProducto.esActivo.toString()
   });
 }




}


guardarEditar_Producto(){
  const _producto:Auto = {
    idAutos:this.datosProducto ==null ? 0:this.datosProducto.idAutos,
    nombre:this.formularioProducto.value.nombre,
    idCategoria:this.formularioProducto.value.idCategoria,
    descripcionCategoria:"",
    precio:this.formularioProducto.value.precio,
    stock:this.formularioProducto.value.stock,
    esActivo:parseInt(this.formularioProducto.value.EsActivo),
  }

  if (this.datosProducto == null){
    this._autoServicio.Login(_producto).subscribe({   //Login es guardar
      next:(data)=>{
        if(data.status){
          this._utilidadService.mostrarAlerta("Porducto fue registrado","Exito!");
          this.modalActual.close("true");
        }else
        this._utilidadService.mostrarAlerta("No se pudo registrar el producto","Error!");
      },
      error:(error)=>{console.log(this.listaCategorias);}
    })


}else{
  this._autoServicio.EditarAuto(_producto).subscribe({
    next:(data)=>{
      if(data.status){
        this._utilidadService.mostrarAlerta("Porducto fue editado","Exito!");
        this.modalActual.close("true");
      }else
      this._utilidadService.mostrarAlerta("No se pudo editar el producto","Error!");
    },
    error:(error)=>{}
  })


}

}
}
