import { Component, Inject,OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



import { rolDescripcion } from '../../../../Interfaces/rol';
import { Usuarios } from '../../../../Interfaces/Usuario';
import { UsuarioServicio } from '../../../../Servicios/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { RolServicio } from '../../../../Servicios/Rol.service';


@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent {

formularioUsuario:FormGroup;
ocultarPassword:boolean=true;
tituloAccion:string="Agregar";
botonAccion:string="Guardar";
listaRoles:rolDescripcion[]=[];

  constructor( 
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario:Usuarios,
    private fb:FormBuilder,
    private _rolServicio:RolServicio,
    private _usuarioServicio:UsuarioServicio,
    private _utilidadService:UtilidadService
  ) { 
   
this.formularioUsuario = this.fb.group({
nombreCompleto:['',[Validators.required]],
correo:['',[Validators.required]],
idRol:['',[Validators.required]],
clave:['',[Validators.required]],
esActivo:['1',[Validators.required]],
});

if(this.datosUsuario !=null){
  this.tituloAccion="Editar";
  this.botonAccion="Actualizar";
  }

this._rolServicio.Lista().subscribe({
  next:(data)=>{
    if(data.status){
      this.listaRoles = data.value;
    }
  },
  error:(error)=>{
    console.log(error);
  }
  })


}

  ngOnInit(): void {
    if(this.datosUsuario!=null){
      this.formularioUsuario.patchValue({
        nombreCompleto:this.datosUsuario.nombreCompleto,
        correo:this.datosUsuario.correo,
        idRol:this.datosUsuario.idRol,
        clave:this.datosUsuario.clave,
        esActivo:this.datosUsuario.esActivo.toString()
      });
    }
  }

  guardarEditar_Usuario(){
    const _usuario:Usuarios = {
      idUsuario:this.datosUsuario ==null ? 0:this.datosUsuario.idUsuario,
      nombreCompleto:this.formularioUsuario.value.nombreCompleto,
      correo:this.formularioUsuario.value.correo,
      idRol:this.formularioUsuario.value.idRol,
      rolDescricion:"",
      clave:this.formularioUsuario.value.clave,
      esActivo:parseInt(this.formularioUsuario.value.esActivo),
    }

    if (this.datosUsuario == null){
      this._usuarioServicio.Guardar(_usuario).subscribe({
        next:(data)=>{
          if(data.status){
            this._utilidadService.mostrarAlerta("Usuario fue registrado","Exito!");
            this.modalActual.close("true");
          }else
          this._utilidadService.mostrarAlerta("No se pudo registrar el usuario","Error!");
        },
        error:(error)=>{}
      })


  }else{
    this._usuarioServicio.EditarUsuario(_usuario).subscribe({
      next:(data)=>{
        if(data.status){
          this._utilidadService.mostrarAlerta("Usuario fue editado","Exito!");
          this.modalActual.close("true");
        }else
        this._utilidadService.mostrarAlerta("No se pudo editar el usuario","Error!");
      },
      error:(error)=>{}
    })


  }

}}
