import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

obs: Subscription;

  constructor() {
this.obs =   this.getObs().pipe(
      map( resp => resp.contador  ),
      filter(

        ( valor, index ) => {
          console.log( 'filter', valor, index);
          return true;
      }
     )
    )

    .subscribe(
      next => console.log(next),
      error => console.log(error),
      () => console.log('complete')
    );
  }

  getObs(): Observable<any>  {
    return new Observable(
      observer => {
        let contador = 0;
        const intervalo = setInterval(() => {
          contador += 1;

                const obj = {
                  contador: contador
                };

          observer.next(obj);
        }, 1000);
      }
    );


  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

}
