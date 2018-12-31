import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    sub;
    id;
    user;
    emergencyPhones;

    constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private dialogService: DialogService) {}
    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
            console.log('El meu id es', this.id);
            this.userService.getUserInfo(this.id).subscribe(resUI => {
                this.user = resUI;
                this.userService.getEmergencyPhoneById(this.id).subscribe(res => {
                    this.emergencyPhones = res;
                });
            });
        });
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }
}
