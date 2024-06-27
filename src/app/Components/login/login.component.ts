import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Interfaces/Login';
import { UsuarioServicio } from '../../Servicios/usuario.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
formularioLogin:FormGroup;
ocultarPassword:boolean=true;
mostrarLoading:boolean=false;

constructor(
  private fb:FormBuilder,
  private router:Router,
  private usuarioServicio:UsuarioServicio,
  private utilidadService:UtilidadService,
){
  this.formularioLogin = this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  });
}


ngOnInit():void{}


iniciarSesion(){
this.mostrarLoading=true;

const request:Login = {
  correo:this.formularioLogin.value.email,
  password:this.formularioLogin.value.password,
}
console.log(request);
this.usuarioServicio.IniciarSesion(request).subscribe({
next:(data)=>{
  if (data.status){
this.utilidadService.guardarSesionUsuario(data.value);
this.router.navigate(['/pages']);
console.log(data.value);

}else{
  this.utilidadService.mostrarAlerta("No se encontraron coincidencias","Opps!");}
},

complete:()=>{
  this.mostrarLoading=false;
},
error:()=>{
  this.utilidadService.mostrarAlerta("Error de conexion","Opps!");
 
}
})


}
}
