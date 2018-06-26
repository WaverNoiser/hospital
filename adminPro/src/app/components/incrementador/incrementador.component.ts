import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { log } from 'util';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
})
export class IncrementadorComponent implements OnInit {
@Input()  leyenda: string = 'leyenda';
@Input() porcentaje: number = 10;
@Output() valor: EventEmitter<number> = new EventEmitter();
@ViewChild('input') inputElement: ElementRef;

  change( event: number) {
    event = this.rangeValid( event );
    this.porcentaje = event;
    /* const htmlELement: any = document.getElementsByName('progreso')[0]; */
   this.inputElement.nativeElement.value = this.porcentaje;
    this.valor.emit( this.porcentaje );
    }

  incrementar() {
     this.porcentaje = this.rangeValid( this.porcentaje + 5  );
     this.valor.emit( this.porcentaje );
    this.inputElement.nativeElement.focus();

  }


  decrementar() {
    this.porcentaje = this.rangeValid( this.porcentaje - 5   );
    this.valor.emit( this.porcentaje );
    this.inputElement.nativeElement.focus();

  }

  // ni mayor a 100 ni menor  a 0
  rangeValid( valor: number ) {
    return ( valor >= 100 ) ? 100 : ( valor <= 0 ) ? 0 : valor;
  }

  constructor() { }

  ngOnInit() {
  }

}
