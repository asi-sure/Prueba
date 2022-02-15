import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyProject';
  constructor( 
    private xrouter: Router
  ) { 
    
  }

  ngOnInit() {
    this.Bienvenido();
	}

    // BIENVENIDO A USUARIOS
    Bienvenido(){ 
      this.xrouter.navigate(['/portada']);
    }
  
}
