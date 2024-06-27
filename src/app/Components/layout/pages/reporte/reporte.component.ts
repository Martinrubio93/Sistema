import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';



import {MAT_DATE_FORMATS} from'@angular/material/core';
import * as _moment from 'moment';
import * as XLSX from 'xlsx';
import { Reporte } from '../../../../Interfaces/Reporte';
import { VentaServicio } from '../../../../Servicios/Venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import moment from 'moment';



export const MAT_DATA_FORMATS = {
parse:{
  dateInput:'DD/MM/YYYY'
},
display:{
dateInput:'DD/MM/YYYY',
monthYearLabel:'MMM YYYY',
}

}


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MAT_DATA_FORMATS}
  ]
})
export class ReporteComponent {


formularioFilro:FormGroup;
listaVentasReporte:Reporte[] = [];
columnasTabla:string[] = ['fechaRegistro','numeroVenta','tipoPago', 'total', "producto", "cantidad", "precio", "totalProducto"];
dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);

@ViewChild(MatPaginator) paginacionTabla!:MatPaginator;
  constructor(  
    private fb:FormBuilder,
    private _ventaServicio:VentaServicio,
    private _utilidadService:UtilidadService){

      this.formularioFilro = this.fb.group({
        fechaInicio:['',[Validators.required]],
        fechaFin:['',[Validators.required]]
      });
    }
  
   
  
  
  ngOnInit():void{ }

    ngAfterViewInit():void{
      this.dataVentaReporte.paginator = this.paginacionTabla;
    }

    buscarVentas(){

const _fechaInicio = moment(this.formularioFilro.value.fechaInicio).format('DD/MM/YYYY');
const _fechaFin = moment(this.formularioFilro.value.fechaFin).format('DD/MM/YYYY');

if(_fechaInicio === "Invalid date" || _fechaFin === "Invalid date"){

  this._utilidadService.mostrarAlerta("Debe ingresar ambas fechas","Opps!");
  return;
}



this._ventaServicio.Reporte(_fechaInicio,_fechaFin).subscribe({
next:(data)=>{
  if(data.status){
    this.listaVentasReporte = data.value;
    this.dataVentaReporte.data = data.value;
  }else{
    this.listaVentasReporte = [];
    this.dataVentaReporte.data = [];
    this._utilidadService.mostrarAlerta("No se encontraron datos","Opps!");
  }
},
error:(error)=>{}



})


    }
//crear hoja de excel A TRAVEX DE UN ARRAY
    exportarExcel(){
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte);
    
    XLSX.utils.book_append_sheet(wb,ws,'Reporte');
    XLSX.writeFile(wb,'Reporte.xlsx');
    
    }

 
}
