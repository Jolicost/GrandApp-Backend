import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserActivitiesComponent } from './user-activities.component';
import { DialogComponent } from '../../dialog/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserActivitiesComponent', () => {
    let component: UserActivitiesComponent;
    let fixture: ComponentFixture<UserActivitiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserActivitiesComponent, DialogComponent],
            imports: [HttpClientModule, MatDialogModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserActivitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
