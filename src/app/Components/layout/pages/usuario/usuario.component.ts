

import { Component, OnInit, AfterViewInit, ViewChild,  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuarios } from '../../../../Interfaces/Usuario';
import { UsuarioServicio } from '../../../../Servicios/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit, AfterViewInit {

columnasTabla:string[] = ['nombreCompleto','correo','rolDescripcion','estado','acciones'];
dataInicio:Usuarios[] = [];
dataListaUsuarios= new MatTableDataSource(this.dataInicio);
@ViewChild(MatPaginator) paginacionTabla!:MatPaginator;


  constructor(
    private diaglog:MatDialog,
    private _usuarioServicio:UsuarioServicio,
    private _utilidadService:UtilidadService
  ){}


  obtenerUsuarios(){
    this._usuarioServicio.Lista().subscribe({
      next:(data)=>{
        if(data.status){
     this.dataListaUsuarios.data=data.value;
        }else{
          this._utilidadService.mostrarAlerta("No se encontraron datos","Opps!");
        }
      },
      error:(error)=>{}
      })
    
    
    }
    ngOnInit():void{
      this.obtenerUsuarios();
    }

    ngAfterViewInit():void{
      this.dataListaUsuarios.paginator = this.paginacionTabla;
    }

aplicarFiltroTabla(event:Event){
const filterValue = (event.target as HTMLInputElement).value;
this.dataListaUsuarios.filter = filterValue.trim().toLowerCase();


}


nuevoUsuario(){
  this.diaglog.open(ModalUsuarioComponent,{
disableClose:true,
  }).afterClosed().subscribe(resultado =>{
    if(resultado =="true"){
      this.obtenerUsuarios();
    }
  });
}

editarUsuario(usuario:Usuarios){
  this.diaglog.open(ModalUsuarioComponent,{
disableClose:true,
data:usuario
  }).afterClosed().subscribe(resultado =>{
    if(resultado == "true"){
      this.obtenerUsuarios();
    }
  });


  }

 eliminarUsuario(usuario:Usuarios){
  Swal.fire({
    title:'¿Estas seguro de eliminar este usuario?',
    text:usuario.nombreCompleto,
    icon:"warning",
    confirmButtonColor:"#3085d6",
    confirmButtonText:"Si,eliminar!",
    showCancelButton:true,
    cancelButtonColor:"#d33",
    cancelButtonText:"No, volver"
  }).then((resultado)=>{

if(resultado.isConfirmed){
this._usuarioServicio.ElimarUsuario(usuario.idUsuario).subscribe({
  next:(data)=>{
    if(data.status){
      this._utilidadService.mostrarAlerta("El usuario fue eliminado","Listo!");
      this.obtenerUsuarios();
    }else
    this._utilidadService.mostrarAlerta("No se pudo eliminar el usuario","Error!");
    
      },
      error:(error)=>{}
    
})
 
}
})
 }

}
  

