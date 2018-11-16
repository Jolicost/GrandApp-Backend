import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitiesComponent } from './activities.component';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

describe('ActivitiesComponent', () => {
    let component: ActivitiesComponent;
    let fixture: ComponentFixture<ActivitiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivitiesComponent, DialogComponent],
            imports: [HttpClientModule, MatDialogModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should get all activities from the API', () => {
    //   component.ngOnInit();
    //   console.log('size', component.activities.length);
    //   console.log('actArray', component.activities);
    //   expect(component.activities.length).not.toEqual(0);
    // });
});
