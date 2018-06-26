import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { element } from 'protractor';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: any;

  constructor( private router: Router,
               private titleTab: Title,
              private meta: Meta ) {
    this.getDataRoute().subscribe(
      (event) => {
        console.log(event);
        this.title = event.title;
        titleTab.setTitle(this.title);
        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.title
        };

        meta.updateTag( metaTag );
      },
      (error) => console.log(error)

    );
  }

  getDataRoute() {
   return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  ngOnInit() {
  }

}
