import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {


  sidebarOpened = false;
  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {

  }

  toggle() {
    if (this.sidebarOpened) {
      this.sidebarService.changeSidebarStatus('close');
      this.sidebarOpened = false;
    } else {
      this.sidebarService.changeSidebarStatus('open');
      this.sidebarOpened = true;
    }
  }

}
