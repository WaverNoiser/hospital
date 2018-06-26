import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { element } from 'protractor';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {


  constructor( @Inject( DOCUMENT ) private _document,
                private _settingsService: SettingsService ) {
                }

  changeTheme( color: string, link: any ) {
    this.viewCheck(link);
    this._settingsService.applyTheme(color);

  }

  viewCheck( link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores ) {
      ref.classList.remove('working');
      link.classList.add('working');
    }
  }

  viewCheckAfterReload() {
    const selectores: any = document.getElementsByClassName('selector');
    const theme = this._settingsService.settings.theme;

    for ( const ref of selectores ) {

      if ( ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }
  ngOnInit() {
    this.viewCheckAfterReload();
  }

}
