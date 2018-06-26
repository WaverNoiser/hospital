import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgresBar', url: '/progress' },
        { title: 'Gráficas', url: '/graficas1' },
        { title: 'Promesas', url: '/promesas' },
        { title: 'Rxjs', url: '/rxjs' },
      ]
    }
  ];

  constructor() { }

}
