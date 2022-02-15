import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../../../service/login.service';
import { Personal } from 'src/app/model/personal.model'; 
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable }  from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  xper : Personal | undefined;
  xusuario!: string;
  xusuario2!: string;
  bienvenido!: string;
  xcodp!: number;
  xlogin!: string;
  modalReference!: NgbModalRef; // para mensaje
  // para mensaje
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private loginService: LoginService,
    private xrouter: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user : ['', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]],
      clave : ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]]
    });
  }

  get f() { return this.loginForm.controls; }

  // ACEPTA ENVIO LOGIN
	onSubmit(modal:any) {
    this.submitted = true;
    console.log("si INgresooo..");
    // stop here if form is invalid
    if ((this.loginForm.invalid) == true) {
      return;
    } 
    this.loginService.getPersonal(this.loginForm.controls.user.value,this.loginForm.controls.clave.value)
            .subscribe(
              (data: Personal) =>  { // start of (1)
                if (data){
                    //this.xper = data;
                    console.log("BIENVENIDOS....");
                    this.xusuario=data.nombres + " " + data.ap + " " + data.am;
                    this.xusuario2=data.nombres + " " + data.ap + " " + data.am;  // para mensaje
                    this.bienvenido= 'Bienvenido::'; // para mensaje
                    this.xcodp= data.codper;
                    this.xlogin=this.loginForm.controls.user.value; //login
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    // sessionStorage.setItem('currentUser', JSON.stringify(data));
                    this.modalReference =  this.modalService.open(modal);
                }else{
                    console.log("error..Usuario no Existe");
                    this.xusuario="Invitado";
                    this.xusuario2= 'Usuario no Autorizado..!'; // para mensaje
                    this.bienvenido= 'Error::';  // para mensaje
                    this.xcodp=0;
                    this.modalReference =  this.modalService.open(modal);
                }
                this.ejecutar(this.xusuario, this.xlogin, this.xrouter, modal);
              }, // end of (1)
              (error: any)   => console.log(error), // (2) second argument
              ()             => console.log('all data gets') // (3) second argument 
      );
  } 

  ejecutar( xuser: any, xlogin: string, xro: Router, modal:any ){
      console.log('ACCESO --> parametro::' + xuser+ " xlogin=>"+ xlogin);
      const obs = new Observable((observer) => {
          console.log("obser-  1");
          xro.navigate([{ outlets: { pie: ['menupie', xuser]}}]);
          console.log("obser-  2");
          xro.navigate([{ outlets: { menus: ['menurol', xlogin]}}]);
          observer.complete();
      });
      obs.subscribe();
      /*
      let mipromesa = new Promise( function(resolve: any, reject: any){
        resolve();
      });
      
      mipromesa.then(function (){
        //xro.navigate([{ outlets: { pie: ['menupie', xuser]}}]);
        console.log("llama a PIE");
      }).then(function (){
        //xro.navigate([{ outlets: { menus: ['menurol', xlogin]}}]);
        console.log("llama a MENUS");
      }).catch(function (){
        console.log("Error al levantar los routers.");
      });;
      */
            
  }

  // BIENVENIDO A USUARIOS
  Bienvenido(){ 
    this.modalReference.close();  // para cerrar
    this.xrouter.navigate(['/portada']);
  }

}
