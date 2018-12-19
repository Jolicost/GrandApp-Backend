import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators
} from '../../../../node_modules/@angular/forms';
import { DialogService } from '../../services/dialog/dialog.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessagesService } from '../../services/messages/messages.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ])
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessagesService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {}

    login() {
        let username = this.loginForm.value.username;
        let password = this.loginForm.value.password;
        username = username.trim();
        if (!username) {
            return;
        }
        password = password.trim();
        if (!password) {
            return;
        }
        this.authService
            .login({ username: username, password: password })
            .subscribe(res => {
                if (this.messageService.getExists()) {
                    this.dialogService.openDialog({
                        mode: 'infoDialog',
                        obj: this.messageService.getMessage()
                    });
                    this.messageService.setMessage(null);
                } else {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('username', username);
                    localStorage.setItem('profilepic', res.user.profilePic);
                    this.authService.changeUserStatus('loginSuccess');
                }
                this.router.navigate(['/dashboard']);
            });
    }
}
