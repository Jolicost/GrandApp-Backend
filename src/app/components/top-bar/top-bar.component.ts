import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  logged: Boolean = false;
  sidebarOpened = false;
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(contentSignal => {
      if (contentSignal === 'succes') {
        this.logged = true;
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

  destroyToken() {
    localStorage.removeItem('token');
  }

  logOut() {
    console.log('faig logout');
    this.destroyToken();
    this.logged = false;
    this.router.navigate(['/login']);
  }
}
