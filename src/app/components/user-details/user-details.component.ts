import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    sub;
    id;
    user;

    constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {}
    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id']; // aqui esta el id
            console.log('El meu id es', this.id);
            this.userService.getUserInfo(this.id).subscribe(resUI => {
                this.user = resUI;
            });
        });
    }
}
