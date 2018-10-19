import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ActivitiesService } from '../../../services/activities/activities.service';
import { HttpClient } from '@angular/common/http';

// 为了在dialog-content能够acces
export interface DialogData {
  mode: string;
  obj: any;
  form: any;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];      // 为了推出component的时候取消订阅，要不然再次进来的时候回再次订阅就会变成订阅两次

  activityForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required),
  });

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dialogService.dialog$.subscribe(mode => {
        // mode （从HTML传过来的）传过来的时候是个obj {mode: 他的action类别, obj: optional的，可以选择传过来任何一个obj如果需要的话}
        if (mode.mode === 'addActivity') {
          this.openDialog(mode);
        }
        if (mode.mode === 'editActivity') {
          this.activityForm.setValue({
            name: mode.obj.name,
            description: mode.obj.description,
            startDate: mode.obj.startDate,
            endDate: mode.obj.endDate,
            image: mode.obj.image,
            lat: mode.obj.lat,
            lng: mode.obj.lng
          });
          this.openDialog(mode);
        }
        if (mode.mode === 'deleteActivity') {
          this.openDialog(mode);
        }
      })
    );
  }

  openDialog(mode): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '300px',
      // 这里有一个form 是为了打开dialog之后立马能加载里面的内容
      data: {mode: mode.mode, obj: mode.obj, form: this.activityForm}    // dialog-content 可以通过data来读取dialog.component里面的变量
    });
    dialogRef.afterClosed().subscribe(result => {
      //
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}


@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.html',
})
export class DialogContentComponent implements OnInit {

    selectedFile = null;
    activityToDelete;
    activityForm = new FormGroup({});
    constructor(
      public dialogRef: MatDialogRef<DialogContentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private http: HttpClient,
      private activityService: ActivitiesService
    ) {
      this.activityToDelete = this.data.obj;
      // console.log(this.activityToDelete);
      if (data.mode !== 'addActivity') {
        this.activityForm = data.form;
      } else {
        this.activityForm = new FormGroup({
          name: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
          ]),
          description: new FormControl('', Validators.required),
          startDate: new FormControl('', Validators.required),
          endDate: new FormControl('', Validators.required),
          image: new FormControl('', Validators.required),
          lat: new FormControl('', Validators.required),
          lng: new FormControl('', Validators.required),
        });
      }
    }

    // onFileSelected(event) {
    //   this.selectedFile = event.target.files[0];
    // }

    // onUpload() {

    // }

    ngOnInit() {

    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
    onSaveClick(data): void {
      const name = this.activityForm.value.name;
      const description = this.activityForm.value.description;
      const startDate = this.activityForm.value.startDate;
      const endDate = this.activityForm.value.endDate;
      const lat = this.activityForm.value.lat;
      const lng = this.activityForm.value.lng;
      const image = this.activityForm.value.image;
      const participants = [];
      const address = '';

      if (data.mode === 'addActivity') {
        this.activityService.addActivitiy({name, description, startDate, endDate, lat, lng, image, participants, address});
        this.dialogRef.close();
      }
      if (data.mode === 'editActivity') {
        const oldAct = data.obj;
        // console.log(oldAct);
        this.activityService.editActivity(oldAct, {name, description, startDate, endDate, lat, lng, image, participants, address});
        this.dialogRef.close();
      }
    }

    onDeleteClick(data) {
      if (data.mode === 'deleteActivity') {
        console.log('1');
        this.activityService.deleteActivity(this.activityToDelete);
        this.dialogRef.close();
      }
    }
}
