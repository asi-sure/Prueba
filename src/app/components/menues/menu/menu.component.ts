import { Component, OnInit } from '@angular/core';
import { MenusService } from './../../../service/menus.service';
import { FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Personal } from './../../../model/personal.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = 'MyProject';
  apiMenus : any;
  apiMepro : any;
  apiRoles : any;
  apiRolme : any;
  codr : number = 0;
  private localStorageService : any;
  
  constructor( 
      private menuService : MenusService,
      private formBuilder: FormBuilder, 
      private xrouter: Router, 
      private activatedroute: ActivatedRoute
    ) { 
      this.localStorageService = localStorage;
  }

  ngOnInit() {
    let xlogin:string;
    let xtoken:string;
    this.activatedroute.params.subscribe( params => {
      if (this.isAuthenticated()) {
            xlogin = this.getCurrentSesion().usuario.login; //xper.usuario.login;
            xtoken = this.getCurrentSesion().token; //xper.token;
                        
            if (this.tokenExpired(xtoken)) {
              console.log("token expirado..");
            } else {
              console.log("token valido..");
              console.log("Sesion Login recuperado :::"+xtoken);
              this.cargarRoles(xlogin, xtoken);
            }
        } else {
            this.codr=0;
            this.cargarRoles('0','0');
            this.apiRoles = [];
            console.log('cero roles.....');
        }
    }); 
/*    
    this.menuService.getRolmeLista().subscribe( response =>{
      this.apiRolme = response;
    })

    this.menuService.getMeproLista().subscribe( response =>{
      this.apiMepro = response;
    })
*/



  } //end ngOnInit()

  onRolesChange(e : any) {
    console.log(e.target.value);
    this.codr = e.target.value;
    if (this.isAuthenticated()) { 
      this.menuService.getRolmeLista().subscribe( response =>{
        console.log("ROLMELISTA...");
        this.apiRolme = response;
      }, (err) => {
        console.log("Error de conexión..");
      })

      this.menuService.getMeproLista().subscribe( response =>{
        console.log("MRPROLISTA...");
        this.apiMepro = response;
      })
    }
  }

  cargarRoles(xlogin: string, xtoken: string){
    console.log("CARGAR_ROLES..."+xlogin);
    if (this.isAuthenticated()) { 
      this.menuService.getRolesLista(xlogin, xtoken).subscribe(
        response =>  { // start of (1)
          this.apiRoles = response;
        }, // end of (1)
        (error: any)   => console.log("Error de conexión.."+error), // (2) second argument
        ()             => console.log('all data gets') // (3) second argument 
      );
    }else{
      this.apiRoles ="";
    }
    if (xlogin != '0') { //si se desconecta
        this.menuService.getRolmeLista().subscribe( response =>{
          console.log("ROLMELISTA...");
          this.apiRolme = response;
        }, 
        (err) => {
          console.log("Error de conexión..");
        })

        this.menuService.getMeproLista().subscribe( response =>{
          console.log("MRPROLISTA...");
          this.apiMepro = response;
        },
        (err) => {
          console.log("Error de conexión..");
        })
    }
  }

siEstaConectado(){
  if (this.isAuthenticated()) {
    this.localStorageService.removeItem('currentUser');
    this.xrouter.navigate([{ outlets: { pie: ['menupie', 'Invitado']}}]);   
  }
}

getCurrentSesion(): Personal {
  var xper = this.localStorageService.getItem('currentUser');
  return (xper) ? <Personal> JSON.parse(xper) : xper;
}

isAuthenticated(): boolean {
  return (this.getCurrentSesion() != null) ? true : false;
};

private tokenExpired(token: string) {
  const array = token.split(".");
  //token.split(".")[1]
  const expiry = (JSON.parse(atob(array[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}


}
