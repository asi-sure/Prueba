import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-desconectar',
  template: ` 
  <div class="modal fade" tabindex="-1" [ngStyle]="{'display': visible ? 'block' : 'none'}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <ng-content select=".app-modal-header"></ng-content>
        </div>
        <div class="modal-body">
          <ng-content select=".app-modal-body"></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select=".app-modal-footer"></ng-content>
        </div>
      </div>
    </div>
  </div>
  `
})
export class DesconectarComponent implements OnInit {

    private localStorageService;
    public visible = false;
    public visibleAnimate = false;

    constructor(private xrouter: Router, 
                private zrouter: ActivatedRoute) {
      this.localStorageService = localStorage;
    }

    ngOnInit() {
      this.zrouter.params.subscribe( params => {
          console.log("ELIMINANDO SESSION....");
          this.localStorageService.removeItem('currentUser');
          this.ejecutar(this.xrouter);
      });
    }
    ejecutar2(){
      this.visible = true;
      console.log('hola amigos');
    }
    ejecutar(xro: Router){
        let mipromesa = new Promise( function(resolve: any, reject: any){          
          resolve();
        });
        mipromesa.then(function (){
          xro.navigate([{ outlets: { pie: ['menupie', 'Invitado']}}]);
        }).then(function (){
           xro.navigate([{ outlets: { menus: ['menurol','0']}}]);
        }).then(function (){
          xro.navigate(['/portada']);
        });    
    }


}
