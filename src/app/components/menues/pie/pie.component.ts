import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personal } from './../../../model/personal.model';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  xusuario = '';
  private localStorageService : any;

  constructor(
    private xrouter: ActivatedRoute,
    private router: Router
  ) {
    this.localStorageService = localStorage;
   }

  ngOnInit(): void {
    this.xrouter.params.subscribe( params => {
      if (this.isAuthenticated()) {
        this.xusuario = this.getCurrentSesion().nombres+" "+this.getCurrentSesion().ap+" "+this.getCurrentSesion().am;
      }else {
        this.xusuario = 'Invitado';
      }
    });
  }


  getCurrentSesion(): Personal {
    var xper = this.localStorageService.getItem('currentUser');
    return (xper) ? <Personal> JSON.parse(xper) : xper;
  }
  
  isAuthenticated(): boolean {
    return (this.getCurrentSesion() != null) ? true : false;
  };

}
