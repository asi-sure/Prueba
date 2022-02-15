import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Personal, Telefono_id, Dato } from '../../model/personal2.model';
import { PersonalService } from '../../service/personal.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// --- desde aqui
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Telefono } from '../../model/personal.model';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  paramsForm!: FormGroup;

  personal!: Personal ;
  dato! : Dato;
  xtel! : Telefono_id;
  xtelefono! : Telefono;
  //telefono : any = [];
  telefono : any = [];
  ///collection = [];

  
  
  registerForm!: FormGroup;
  submitted = false;

  nuevoTel = false;
  telefonos : any = [];

  modalReference!: NgbModalRef;  //para mensaje


  constructor(
    private fb: FormBuilder,
//    private xruterador: Router,
    private personalService: PersonalService,
    private xrouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      p_nombres: ['', Validators.required],
      p_tipoper: ['', Validators.required],
      p_estado: ['', Validators.required]
    }); 
    this.registerForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      ci: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      ap: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      am: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      genero: ['', Validators.required],
      telefono: ['', [Validators.minLength(3),Validators.maxLength(15)]],
    });
  }

  onRolesChange(e : any) {
    this.onEnvioParams(this.paramsForm.controls.p_estado.value);
  }
  onEstado(est:Number){
    this.onEnvioParams(est);
  }
  onNombres(event: { charCode: number; }){
    if(event.charCode == 13){
      this.onEnvioParams(this.paramsForm.controls.p_estado.value);
    }                         // Cierra el input    
  }
  onEnvioParams(xest:any){
    let xnombres='%';
    if (this.paramsForm.controls.p_nombres.value != ''){
      xnombres=this.paramsForm.controls.p_nombres.value;
    }
    let xtipoper='0';
    if (this.paramsForm.controls.p_tipoper.value != ''){
      xtipoper=this.paramsForm.controls.p_tipoper.value;
    }
    console.log(this.paramsForm.controls.p_nombres.value+"-"+this.paramsForm.controls.p_tipoper.value+"-"+ xest);
    this.router.navigate(['ventas/detalleven/'+xnombres+'/'+xtipoper+'/'+xest]);
  }

  // Visualizar Modal
  showModal():void {
    this.inicializa();
    $("#myModal-ven").modal('show');
  }

  // INICIALIZA LOS DATOS DEL FORMULARIO
  inicializa():void{
    this.registerForm.controls.tipo.setValue('');
    this.registerForm.controls.ci.setValue('');
    this.registerForm.controls.nombre.setValue('');
    this.registerForm.controls.ap.setValue('');
    this.registerForm.controls.am.setValue('');
    this.registerForm.controls.genero.setValue('');
    this.registerForm.controls.telefono.setValue('');
    this.telefonos = [];
    this.telefono  = [];
  }

  addTelefono (){                                   // Abre el input para ingresar un telefono
    this.nuevoTel = true;
  }
  saveTelefono(event: { charCode: number; }){
    console.log("ingresooo..");
    if(event.charCode == 13){
      let num = this.registerForm.controls.telefono.value;
      this.telefonos.push(num);
      this.registerForm.controls.telefono.setValue('');     // Resetea el input de telefono
      this.nuevoTel = false; 
    }                         // Cierra el input    
  }

  // Boton guardar Model
  sendModal(): void {
    //do something here
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid)==true) {
      return;
    }

    //armando el array de telefonos
    for (let elemento of this.telefonos) { 
      this.xtel = {
        numero : elemento
      }
      this.xtelefono = {
        telefono_id : this.xtel
      }
      //insert el elemento a telefonos
      this.telefono.push(this.xtelefono);
    }
    //verifico telefono
    console.log(this.telefono);

    //armando dato
    this.dato = {
      ci : this.registerForm.controls.ci.value
    }
    //verificar
    console.log(this.dato);

    //armando todo personal
    this.personal = {
      "codper": 6,
      "nombres" : (this.registerForm.controls.nombre.value).toUpperCase(),
      "ap" : (this.registerForm.controls.ap.value).toUpperCase(),
      "am" : (this.registerForm.controls.am.value).toUpperCase(),
      "tipoper" : this.registerForm.controls.tipo.value,
      "estado" : 1,
      "genero" : (this.registerForm.controls.genero.value).toUpperCase(),
      "foto" : 'foto.png',
      "urlfoto" : "abc",
      "token" : "xyz",
      "dato" : this.dato,
      "telefono" : this.telefono
    }

    //verficando
    console.log(this.personal);
/*
    this.personalService.create(data)
      .subscribe(
        response => {
          console.log(response);
          console.log("todo esta OK.");
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
*/
    //envio toda la interface al BACK-END
    this.personalService.savePersonal(this.personal).subscribe(  
      response => {
          console.log("todo esta OK."); 
          this.redirectTo('ventas/detalleven/1');
      },  
      error => {  
        console.log("error while saving data in the DB"); 
      }      
    ); 
    
    
    
    // ocultar ventana
    this.hideModal();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  // Boton Cancelar modal
  hideModal():void {
    //ocultar el modal
    this.closebutton.nativeElement.click();
    //this.router.navigate([{ outlets: { pie: ['ventas']}}]);
    
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


} //fin clase

function redirect() {
  throw new Error('Function not implemented.');
}

