import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ActivitiesService } from '../../../services/activities/activities.service';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../../../models/activity';
import { MessagesService } from '../../../services/messages/messages.service';

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
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('', Validators.required),
    timestampStart: new FormControl('', Validators.required),
    timestampEnd: new FormControl('', Validators.required),
    images: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    long: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    activityType: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required)
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
            title: mode.obj.title,
            description: mode.obj.description,
            timestampStart: mode.obj.timestampStart,
            timestampEnd: mode.obj.timestampEnd,
            images: mode.obj.images,
            lat: mode.obj.lat,
            long: mode.obj.long,
            address: mode.obj.address,
            activityType: mode.obj.activityType,
            price: mode.obj.price,
            rating: mode.obj.rating,
            capacity: mode.obj.capacity
          });
          this.openDialog(mode);
        }
        if (mode.mode === 'deleteActivity') {
          this.openDialog(mode);
        }
        if (mode.mode === 'infoDialog') {
          this.openDialog(mode);
        }
      })
    );
  }

  openDialog(mode): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '600px',
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
      private activityService: ActivitiesService,
      private messagesService: MessagesService,
      private dialogService: DialogService
    ) {
      this.activityToDelete = this.data.obj;

      // console.log(this.activityToDelete);

      if (data.mode !== 'addActivity') {
        this.activityForm = data.form;
      } else {
        this.activityForm = new FormGroup({
          title: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
          ]),
          description: new FormControl('', Validators.required),
          timestampStart: new FormControl('', Validators.required),
          timestampEnd: new FormControl('', Validators.required),
          images: new FormControl('', Validators.required),
          lat: new FormControl('', Validators.required),
          long: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          activityType: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required),
          rating: new FormControl('', Validators.required),
          capacity: new FormControl('', Validators.required)
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
      const newActivity: Activity = {
        id: null,
        userId: null,
        title: this.activityForm.value.title,
        description : this.activityForm.value.description,
        timestampStart : this.activityForm.value.timestampStart,
        timestampEnd : this.activityForm.value.timestampEnd,
        lat : this.activityForm.value.lat,
        long : this.activityForm.value.long,
        images : this.activityForm.value.images,
        participants : [],
        address : this.activityForm.value.address,
        activityType : this.activityForm.value.activityType,
        price : this.activityForm.value.price,
        rating : this.activityForm.value.rating,
        capacity : this.activityForm.value.capacity
      };

      const title = this.activityForm.value.title;
      const description = this.activityForm.value.description;
      const timestampStart = this.activityForm.value.timestampStart;
      const timestampEnd = this.activityForm.value.timestampEnd;
      const lat = this.activityForm.value.lat;
      const long = this.activityForm.value.long;
      const images = this.activityForm.value.images;
      const participants = [];
      const address = this.activityForm.value.address;
      const activityType = this.activityForm.value.activityType;
      const price = this.activityForm.value.price;
      const rating = this.activityForm.value.rating;
      const capacity = this.activityForm.value.capacity;

      if (data.mode === 'addActivity') {
        this.activityService.addActivitiy(
          {title: title, description: description, timestampStart: timestampStart, timestampEnd: timestampEnd, lat: lat,
            long: long, images: images, participants: participants, address: address, activityType: activityType,
            price: price, rating: rating, capacity: capacity}
        ).subscribe(res => {
          if (this.messagesService.getExists()) {
            this.dialogService.openDialog({mode: 'infoDialog', obj: this.messagesService.getMessage()});
            this.messagesService.setMessage(null);
          } else {
            this.activityService.actDataChanged('changed');
            // this.snackBarService.openSnackBar({message: 'Added successful!', action: 'Ok'});
            this.onCancelClick();
          }
      });
      this.dialogRef.close();
      }
      if (data.mode === 'editActivity') {
        const idAct = data.obj.id;
        this.activityService.editActivity({id: idAct, title: title, description: description, timestampStart: timestampStart,
          timestampEnd: timestampEnd, lat: lat,
          long: long, images: images, participants: participants, address: address, activityType: activityType,
          price: price, rating: rating, capacity: capacity})
          .subscribe(res => {
            if (this.messagesService.getExists()) {
              this.dialogService.openDialog({mode: 'infoDialog', obj: this.messagesService.getMessage()});
              this.messagesService.setMessage(null);
            } else {
              this.activityService.actDataChanged('changed');
              // this.snackBarService.openSnackBar({message: 'Added successful!', action: 'Ok'});
              this.onCancelClick();
            }
          });
        this.dialogRef.close();
      }
    }

    onDeleteClick(data) {
      if (data.mode === 'deleteActivity') {
        console.log(data);
        this.activityService.deleteActivity(data.obj.id)
        .subscribe(res => {
          if (this.messagesService.getExists()) {
            this.dialogService.openDialog({mode: 'infoDialog', obj: this.messagesService.getMessage()});
            this.messagesService.setMessage(null);
          } else {
            this.activityService.actDataChanged('changed');
            // this.snackBarService.openSnackBar({message: 'Added successful!', action: 'Ok'});
            this.onCancelClick();
          }
          this.dialogRef.close();
        });
      }
    }
}
