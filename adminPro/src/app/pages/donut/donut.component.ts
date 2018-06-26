import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
})
export class DonutComponent implements OnInit {

  // Doughnut
  @Input('labels') public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') public doughnutChartData: number[] = [350, 450, 100];
  @Input('type') public doughnutChartType: string = 'doughnut';
  @Input() public title: string = 'title';


  ngOnInit() { }
  constructor() {}

}
