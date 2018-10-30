import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '../../../../node_modules/@angular/forms';
import { DialogService } from '../../services/dialog/dialog.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    // private userService: UserService,
    // private messageService: MessageService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {

  }

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    email = email.trim();
    if (!email) {
      return;
    }
    password = password.trim();
    if (!password) {
      return;
    }
    // this.authService.login({email: email, password: password})
    //   .subscribe(user => {
    //     if (this.messageService.getExists()) {
    //       this.dialogService.openDialog({mode: 'infoDialog', obj: this.messageService.getMessage()});
    //       this.messageService.setMessage(null);
    //     } else {
    //       this.setCookie(email, password, user.token);
    //       // 呼叫userService的方法，让订阅者们收到新的值
    //       this.userService.changeUserStatus('loginSuccess');
    //       this.router.navigate(['/userinfo']);
    //     }
    // });
  }

}
