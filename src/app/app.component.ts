import { Component } from '@angular/core';
import { SidebarService } from './services/sidebar/sidebar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = false;

  constructor(
    private sidebarService: SidebarService
  ) {
    this.sidebarService.opened$.subscribe(status => {
      if (status === 'open') {
        this.opened = true;
      } else {
        this.opened = false;
      }
    });
  }
}
