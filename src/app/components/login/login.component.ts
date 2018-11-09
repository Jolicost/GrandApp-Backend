import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { resolveDirective } from '@angular/core/src/render3/instructions';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog/dialog.service';
import { stringify } from 'querystring';
import { MessagesService } from '../../services/messages/messages.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessagesService) {
   }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    console.log(username, password); // to make sure I get user and password
    this.Auth.login(username, password).subscribe(data => {
      if (this.messageService.getExists()) {
        console.log('estic aqui');
        this.dialogService.openDialog({mode: 'infoDialog', obj: this.messageService.getMessage()});
        this.messageService.setMessage(null);
      } else {
        localStorage.setItem('usertoken', data.token);
        this.router.navigate(['/dashboard']);
      }
    });
  }
  }
