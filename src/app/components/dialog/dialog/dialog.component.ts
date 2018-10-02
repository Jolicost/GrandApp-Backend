import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

import { DialogService } from '../../../services/dialog/dialog.service';

// 为了在dialog-content能够acces
export interface DialogData {
  mode: string;
  obj: any;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];      // 为了推出component的时候取消订阅，要不然再次进来的时候回再次订阅就会变成订阅两次

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dialogService.dialog$.subscribe(mode => {
        // mode 传过来的时候是个obj {mode: 他的action类别, obj: optional的，可以选择传过来任何一个obj如果需要的话}
        if (mode.mode === 'addActivity') {
          this.openDialog(mode);
        }
      })
    );
  }

  openDialog(mode): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '300px',
      data: {mode: mode.mode, obj: mode.obj}    // dialog-content 可以通过data来读取dialog.component里面的变量
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

    classificationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl('', Validators.required)
    });

    constructor(
      public dialogRef: MatDialogRef<DialogContentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private dialogService: DialogService
    ) {

    }

    ngOnInit() {

    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
    onSaveClick(mode): void {

    }
}
