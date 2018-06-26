import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    const promesa = new Promise( (resolve, reject) => {
      let contador = 0;

      const intervalo = setInterval( () => {
        console.log(contador);
        contador += 1;

        if ( contador === 3) {
          reject('valio pito');
          clearInterval(intervalo);
        }
      }, 1000 );
    } );

    promesa.then(
      () => console.log('termino')
     ).catch( error => console.error('error en la promesa: ' + error) );
   }

  ngOnInit() {
  }

}
