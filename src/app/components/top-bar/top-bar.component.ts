import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  logged = localStorage.getItem('token');
  username = localStorage.getItem('username');

  sidebarOpened = false;
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
    this.logged = null;
  }

  ngOnInit() {
    // 可以从任何组件来订阅user$，来获取改变的值
    this.authService.user$.subscribe(r => {
      if (r === 'loginSuccess') {
        this.logged = localStorage.getItem('token');
        this.username = localStorage.getItem('username');
      }
    });
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
