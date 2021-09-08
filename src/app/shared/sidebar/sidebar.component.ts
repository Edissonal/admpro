import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuitems: any[];


  constructor(private sidebarService: SidebarService) {
    this.menuitems = sidebarService.menu;

    console.log(this.menuitems);
  }

  ngOnInit(): void {
  }

}
