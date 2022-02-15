import { Component,ElementRef, OnInit } from '@angular/core';

import { PersonalService } from '../../../service/personal.service';
import { Personal } from '../.././../model/personal.model';
import { ActivatedRoute, Router  } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// --- desde aqui
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-detven',
  templateUrl: './detven.component.html',
  styleUrls: ['./detven.component.css']
})
export class DetvenComponent implements OnInit {
  tpersonas: any = [];
  collection = [];
  
  registerForm!: FormGroup;
  submitted = false;

  //parametros
  xestado : number=1;
  xtipoper : string='';
  xnombres : string='';

  constructor(
    private personalService: PersonalService,
    private xrouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {

   }

  ngOnInit(): void {
  
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
    });

    this.route.paramMap.subscribe(params => {
          console.log("esto llegoo::"+params.get('xestado'));
          if (params.get('xestado')==null){
            this.xnombres = '';
            this.xtipoper = '';
            this.xestado = 1;
          }else{  
            this.xnombres = String(params.get('xnombres'));
            this.xtipoper = String(params.get('xtipoper'));
            this.xestado  = Number(params.get('xestado'));
          }  
          //CONSULTA SOBRE PERSONAL
          this.personalService.getPersonalLista(this.xnombres,this.xtipoper,this.xestado).subscribe(
            (data: any) =>  { // start of (1)
              this.tpersonas = data ;
              this.collection = data;
            }, // end of (1)
            (error: any)   => console.log(error), // (2) second argument
            ()             => console.log('all data gets') // (3) second argument 
          );
    });
    
  }

  // Visualizar Modal
  showModal():void {
    this.inicializa();
    $("#myModal").modal('show');
  }

  // INICIALIZA LOS DATOS DEL FORMULARIO
  inicializa():void{
  ///  this.registerForm.get('ru').setValue("");  
  ///  this.registerForm.get('nombre').setValue("");
  /*  
    this.registerForm.get('ap').setValue("");
    this.registerForm.get('am').setValue("");
    this.registerForm.get('celular').setValue("");
    this.gender="";
    this.ecivil="";
    this.registerForm.get('fnac').setValue("");      
    this.registerForm.get('direccion').setValue("");
    this.registerForm.get('foto').setValue(""); 
  */  
  }

  // Boton guardar Model
  sendModal(): void {
    //do something here
///    this.submitted = true;
    // stop here if form is invalid
/*
    if ((this.registerForm.invalid)==true) {
      return;
    }
*/    
    // console.log(this.datos[0].dia+'/'+this.datos[0].mes+'/'+this.datos[0].anio);
///    let xfecha = this.registerForm.get("fnac").value;
///    let xfnac=new Date(xfecha.year+'-'+xfecha.month+'-'+xfecha.day);

//    console.log("fecha nacimiento ::"+xfnac);
//    console.log("genero ::"+this.registerForm.get("gender").value);
/*
    this.per.codp = this.xtiposw;
    this.per.ruci = this.registerForm.get("ru").value;
    this.per.nombre = this.registerForm.get("nombre").value;
    this.per.ap = this.registerForm.get("ap").value;
    this.per.am = this.registerForm.get("am").value;
    this.per.celular = this.registerForm.get("celular").value;
    this.per.genero = this.registerForm.get("gender").value;
    this.per.fnac = xfnac;
    this.per.ecivil = this.registerForm.get("ecivil").value;
    this.per.direc = this.registerForm.get("direccion").value;
    this.per.foto = this.registerForm.get("foto").value;
    console.log(this.per);
*/
    // this.personalService.saveUploadFileObject(this.per).subscribe(  
/*      
        if(this.selectedFiles != null)  {  
              this.currentFileUpload = this.selectedFiles.item(0);
              console.log(this.currentFileUpload);  
              const formdata: FormData = new FormData();
              formdata.append('file', this.currentFileUpload);
              formdata.append('per', JSON.stringify(this.per));
              
        }else{
                  
        }    
*/        
    // ocultar ventana
    this.hideModal();
  }

  // Boton Cancelar modal
  hideModal():void {
    console.log("click hide modal..");
///      document.getElementById('close-modal').click();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

///  getCurrentSesion(): Personas {
///    var xper = this.localStorageService.getItem('currentUser');
///    return (xper) ? <Personas> JSON.parse(xper) : null;
///  }
  
  isAuthenticated(): boolean {
///    return (this.getCurrentSesion() != null) ? true : false;
    return true;
  };

} //main
