import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  settings: settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor( @Inject( DOCUMENT ) private _document ) {
    this.loadSettings();
   }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify( this.settings ) );

  }

  loadSettings() {
    if ( localStorage.getItem('settings') ) {
      this.settings = JSON.parse( localStorage.getItem('settings') );
      this.applyTheme( this.settings.theme);
    } else {
      this.applyTheme( this.settings.theme);
    }

  }

  applyTheme( theme: string ) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('tema').setAttribute('href', url );
    this.settings.theme = theme;
    this.settings.themeUrl = url;
    this.saveSettings();
  }
}

// tslint:disable-next-line:class-name
interface settings  {
  themeUrl: string;
  theme: string;
}


