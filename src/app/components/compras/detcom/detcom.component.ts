import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators'; 

@Component({
  selector: 'app-detcom',
  templateUrl: './detcom.component.html',
  styleUrls: ['./detcom.component.css']
})
export class DetcomComponent implements OnInit {
  ob$: Observable<Number> = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10,12,15,16).pipe(filter( v => v % 3 === 0),map( v => v * 10));

  constructor() { }

  ngOnInit(): void {
    this.ob$.subscribe(
      dato => console.log('next:', dato),
      err => console.log('error:', err),
      () => console.log('Completed'),
    );
  }

}
