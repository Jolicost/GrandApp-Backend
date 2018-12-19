import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatToolbarModule,
                MatSidenavModule,
                BrowserAnimationsModule
            ],
            declarations: [AppComponent, TopBarComponent, SideBarComponent]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    // it(`should have as title 'grandapp'`, async(() => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   const app = fixture.debugElement.componentInstance;
    //   expect(app.title).toEqual('grandapp');
    // }));
    // it('should render title in a h1 tag', async(() => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   fixture.detectChanges();
    //   const compiled = fixture.debugElement.nativeElement;
    //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to grandapp!');
    // }));
});
