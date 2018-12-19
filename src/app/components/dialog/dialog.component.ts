import {
    Component,
    Inject,
    OnInit,
    OnDestroy,
    ElementRef
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
    FormGroup,
    FormControl,
    Validators
} from '../../../../node_modules/@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../../models/activity';
import { MessagesService } from '../../services/messages/messages.service';
import { UserService } from '../../services/user/user.service';
import { UploadImagesService } from 'src/app/services/upload/upload-images.service';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { ViewChild } from '@angular/core';
import * as moment from 'moment';
import { GeocodingService } from 'src/app/services/geocoding/geocoding.service';

// 为了在dialog-content能够acces
export interface DialogData {
    mode: string;
    obj: any;
    form: any;      // its for difference type of form you are passing to dialog component
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {
    subscriptions: Array<Subscription> = []; // 为了推出component的时候取消订阅，要不然再次进来的时候回再次订阅就会变成订阅两次

    // ACTIVITY FORM CREATION
    activityForm = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        description: new FormControl('', Validators.required),
        dateStart: new FormControl('', Validators.required),
        dateEnd: new FormControl('', Validators.required),
        timeStart: new FormControl('', Validators.required),
        timeEnd: new FormControl('', Validators.required),
        images: new FormControl('', Validators.required),
        adressToConvert: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        activityType: new FormControl('', Validators.required),
        price: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$')
        ]),
        rating: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$')
        ]),
        capacity: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$')
        ])
    });

    // USER FORM CREATION
    userInfoForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        completeName: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        birthday: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        phone: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        profilePic: new FormControl('', [
            Validators.required,
        ]),
    });

    constructor(
        public dialog: MatDialog,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.subscriptions.push(
            this.dialogService.dialog$.subscribe(mode => {
                // mode （从HTML传过来的）传过来的时候是个obj {mode: 他的action类别, obj: optional的，可以选择传过来任何一个obj如果需要的话}
                // in this section we do all of necessary operation before to open the dialog
                if (mode.mode === 'addActivity') {
                    this.openDialog(mode);
                }
                if (mode.mode === 'editActivity') {
                    // EVERYTHING OF HERE IS FOR AUTO FILLING THE FORM
                    const humanizeTimeStart = this.timeConverter(
                        mode.obj.timestampStart,
                        'time'
                    );
                    const humanizeTimeEnd = this.timeConverter(
                        mode.obj.timestampEnd,
                        'time'
                    );
                    this.activityForm.setValue({
                        title:
                            mode.obj.title === undefined ? '' : mode.obj.title,
                        description:
                            mode.obj.description === undefined
                                ? ''
                                : mode.obj.description,
                        dateStart: '',
                        dateEnd: '',
                        timeStart: humanizeTimeStart,
                        timeEnd: humanizeTimeEnd,
                        images:
                            mode.obj.images === undefined
                                ? ''
                                : mode.obj.images,
                        adressToConvert:
                            mode.obj.adressToConvert === undefined
                                ? ''
                                : mode.obj.adressToConvert,
                        address:
                            mode.obj.address === undefined
                                ? ''
                                : mode.obj.address,
                        activityType:
                            mode.obj.activityType === undefined
                                ? ''
                                : mode.obj.activityType,
                        price:
                            mode.obj.price === undefined ? '' : mode.obj.price,
                        rating:
                            mode.obj.rating === undefined
                                ? ''
                                : mode.obj.rating,
                        capacity:
                            mode.obj.capacity === undefined
                                ? ''
                                : mode.obj.capacity
                    });
                    this.openDialog(mode);
                }
                if (mode.mode === 'deleteActivity') {
                    this.openDialog(mode);
                }
                if (mode.mode === 'infoDialog') {
                    this.openDialog(mode);
                }
                if (mode.mode === 'editUserInfo') {
                    this.userInfoForm.setValue({
                        email:
                            mode.obj.email === undefined ? '' : mode.obj.email,
                        completeName:
                            mode.obj.completeName === undefined
                                ? ''
                                : mode.obj.completeName,
                        birthday:
                            mode.obj.birthday === undefined
                                ? ''
                                : mode.obj.birthday,
                        phone:
                            mode.obj.phone === undefined ? '' : mode.obj.phone,
                        profilePic:
                            mode.obj.profilePic === undefined ? '' : mode.obj.profilePic,
                    });
                    this.openDialog(mode);
                }
            })
        );
    }

    timeConverter(UNIX_timestamp, type) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12'
        ];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        let time;
        if (type === 'time') {
            time = hour + ':' + min + ':' + sec;
        } else if (type === 'year') {
            return year;
        } else if (type === 'month') {
            return month;
        } else if (type === 'day') {
            return date;
        } else {
            time =
                date +
                ' ' +
                month +
                ' ' +
                year +
                ' ' +
                hour +
                ':' +
                min +
                ':' +
                sec;
        }
        return time;
    }

    openDialog(mode): void {
        // ----------------------------------------------
        // -----------to make auto complete--------------
        // ----------------------------------------------
        if (mode.mode === 'editUserInfo') {
            const dialogRef = this.dialog.open(DialogContentComponent, {
                width: '600px',
                // 这里有一个form 是为了打开dialog之后立马能加载里面的内容
                data: {
                    mode: mode.mode,
                    obj: mode.obj,
                    form: this.userInfoForm
                } // dialog-content 可以通过data来读取dialog.component里面的变量
            });
            dialogRef.afterClosed().subscribe(result => {
                //
            });
        } else {
            const dialogRef = this.dialog.open(DialogContentComponent, {
                width: '600px',
                // 这里有一个form 是为了打开dialog之后立马能加载里面的内容
                data: {
                    mode: mode.mode,
                    obj: mode.obj,
                    form: this.activityForm
                } // dialog-content 可以通过data来读取dialog.component里面的变量
            });
            dialogRef.afterClosed().subscribe(result => {
                //
            });
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}

@Component({
    selector: 'app-dialog-content',
    templateUrl: './dialog-content.html'
})
export class DialogContentComponent implements OnInit {
    @ViewChild('imageInput') imageInputVariable: ElementRef;

    base64textString;
    uploadedImage: File;
    imageUrl;
    activityToDelete;
    activityForm = new FormGroup({});
    userInfoForm = new FormGroup({});
    startDate;
    endDate;
    timeStart;
    timeEnd;
    geoCodedLat;
    geoCodedLong;

    ngOnInit() {}

    constructor(
        public dialogRef: MatDialogRef<DialogContentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private http: HttpClient,
        private activityService: ActivitiesService,
        private messagesService: MessagesService,
        private dialogService: DialogService,
        private uploadImagesService: UploadImagesService,
        private ng2ImgMax: Ng2ImgMaxService,
        private userService: UserService,
        private geocodingService: GeocodingService
    ) {
        this.activityToDelete = this.data.obj;
        // ----------------------------------------------
        // -----------to make auto complete--------------
        // ----------------------------------------------
        if (data.mode === 'editActivity') {
            this.activityForm = data.form;
        } else if (data.mode === 'editUserInfo') {
            this.userInfoForm = data.form;
        } else {
            this.activityForm = new FormGroup({
                title: new FormControl('', [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                description: new FormControl('', Validators.required),
                dateStart: new FormControl('', Validators.required),
                dateEnd: new FormControl('', Validators.required),
                timeStart: new FormControl('', Validators.required),
                timeEnd: new FormControl('', Validators.required),
                images: new FormControl('', Validators.required),
                adressToConvert: new FormControl('', Validators.required),
                address: new FormControl('', Validators.required),
                activityType: new FormControl('', Validators.required),
                price: new FormControl('', Validators.required),
                rating: new FormControl('', Validators.required),
                capacity: new FormControl('', Validators.required)
            });
        }
    }

    onFileSelected(event) {
        const file = event.target.files[0];
        // Compress the image to 0.75MB
        this.ng2ImgMax.compressImage(file, 0.075).subscribe(
            result => {
                this.uploadedImage = new File([result], result.name);
                console.log('imageCompressed', this.uploadedImage);
                const reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsBinaryString(this.uploadedImage);
            },
            error => {
                // console.log('Oh no!', error);
                this.dialogService.openDialog({
                    mode: 'infoDialog',
                    obj: error.reason + ' Please try with another image!'
                });
            }
        );
    }

    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        console.log(btoa(binaryString));
    }

    onUpload() {
        this.uploadImagesService
            .upload(this.base64textString)
            .subscribe(res => {
                if (this.messagesService.getExists()) {
                    this.dialogService.openDialog({
                        mode: 'infoDialog',
                        obj: this.messagesService.getMessage()
                    });
                    this.messagesService.setMessage(null);
                } else {
                    this.imageUrl = res.imageUrl;
                    // this.snackBarService.openSnackBar({message: 'Added successful!', action: 'Ok'});
                }
            });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
    onSaveClick(data): void {
        if (data.mode === 'addActivity' || data.mode === 'editActivity') {
            const addressName = this.activityForm.value.adressToConvert;
            this.geocodingService.getLatLong(addressName).subscribe(res => {
                if (this.messagesService.getExists()) {
                    this.dialogService.openDialog({
                        mode: 'infoDialog',
                        obj: this.messagesService.getMessage()
                    });
                    this.messagesService.setMessage(null);
                } else {
                    this.geoCodedLat = res.results[0].geometry.location.lat;
                    this.geoCodedLong = res.results[0].geometry.location.lng;

                    const title = this.activityForm.value.title;
                    const description = this.activityForm.value.description;
                    const lat = this.geoCodedLat;
                    const long = this.geoCodedLong;
                    const images = this.imageUrl;
                    const participants = [];
                    const address = this.activityForm.value.address;
                    const activityType = this.activityForm.value.activityType;
                    const price = this.activityForm.value.price;
                    const rating = this.activityForm.value.rating;
                    const capacity = this.activityForm.value.capacity;

                    if (data.mode === 'addActivity') {
                        this.timeEnd = this.activityForm.value.timeEnd; // get start time from form
                        this.timeStart = this.activityForm.value.timeStart; // get end time from form
                        const start = `${this.startDate} ${this.timeStart}`; // get the start time in mm/dd/yyyy hh:mm in String
                        const end = `${this.endDate} ${this.timeEnd}`; // get the end time in mm/dd/yyyy hh:mm in String
                        const startMoment = moment(start); // create the moment()
                        const endMoment = moment(end);
                        const timestampStart =
                            startMoment.toDate().getTime() / 1000 + ''; // transform the moment to date and the date to timestamp
                        const timestampEnd =
                            endMoment.toDate().getTime() / 1000 + '';

                        this.activityService
                            .addActivitiy({
                                title: title,
                                description: description,
                                timestampStart: timestampStart,
                                timestampEnd: timestampEnd,
                                lat: lat,
                                long: long,
                                images: images,
                                participants: participants,
                                address: address,
                                activityType: activityType,
                                price: price,
                                rating: rating,
                                capacity: capacity
                            })
                            .subscribe(res3 => {
                                if (this.messagesService.getExists()) {
                                    console.log(
                                        'error: ',
                                        this.messagesService.getMessage()
                                    );
                                    this.dialogService.openDialog({
                                        mode: 'infoDialog',
                                        obj: this.messagesService.getMessage()
                                    });
                                    this.messagesService.setMessage(null);
                                } else {
                                    this.activityService.actDataChanged(
                                        'changed'
                                    );
                                    // this.snackBarService.openSnackBar({message: 'Added successful!', action: 'Ok'});
                                    this.onCancelClick();
                                }
                            });
                        this.dialogRef.close();
                    }
                    if (data.mode === 'editActivity') {
                        const idAct = data.obj.id;
                        this.timeEnd = this.activityForm.value.timeEnd; // get start time from form
                        this.timeStart = this.activityForm.value.timeStart; // get end time from form
                        const start = `${this.startDate} ${this.timeStart}`; // get the start time in mm/dd/yyyy hh:mm in String
                        const end = `${this.endDate} ${this.timeEnd}`; // get the end time in mm/dd/yyyy hh:mm in String
                        const startMoment = moment(start); // create the moment()
                        const endMoment = moment(end);
                        const timestampStart =
                            startMoment.toDate().getTime() / 1000 + ''; // transform the moment to date and the date to timestamp
                        const timestampEnd =
                            endMoment.toDate().getTime() / 1000 + '';
                        this.activityService
                            .editActivity({
                                id: idAct,
                                title: title,
                                description: description,
                                timestampStart: timestampStart,
                                timestampEnd: timestampEnd,
                                lat: lat,
                                long: long,
                                images: images,
                                participants: participants,
                                address: address,
                                activityType: activityType,
                                price: price,
                                rating: rating,
                                capacity: capacity
                            })
                            .subscribe(res2 => {
                                if (this.messagesService.getExists()) {
                                    this.dialogService.openDialog({
                                        mode: 'infoDialog',
                                        obj: this.messagesService.getMessage()
                                    });
                                    this.messagesService.setMessage(null);
                                } else {
                                    this.activityService.actDataChanged(
                                        'changed'
                                    );
                                    // this.snackBarService.openSnackBar({message: 'Added successful!', action: 'Ok'});
                                    this.onCancelClick();
                                }
                            });
                        this.dialogRef.close();
                    }
                }
            });
        }
        if (data.mode === 'editUserInfo') {
            const email = this.userInfoForm.value.email;
            const completeName = this.userInfoForm.value.completeName;
            const birthday = this.userInfoForm.value.birthday;
            const phone = this.userInfoForm.value.phone;
            const profilePic = this.userInfoForm.value.profilePic;
            const idUser = data.obj._id;
            this.userService
                .updateUserInfo(
                    {
                        email: email,
                        completeName: completeName,
                        birthday: birthday,
                        phone: phone,
                        profilePic: profilePic
                    },
                    idUser
                )
                .subscribe(res1 => {
                    if (this.messagesService.getExists()) {
                        this.dialogService.openDialog({
                            mode: 'infoDialog',
                            obj: this.messagesService.getMessage()
                        });
                        this.messagesService.setMessage(null);
                    } else {
                        this.userService.userDataChanged('changed');
                        // this.snackBarService.openSnackBar({message: 'Added successful!', action: 'Ok'});
                        this.onCancelClick();
                    }
                });
            this.dialogRef.close();
        }
    }

    // 从Date格式转换到Timestamp为了能够储存到DB里面
    addDate(type: string, event: MatDatepickerInputEvent<Date>) {
        const startDate = this.activityForm.value.dateStart;
        const endDate = this.activityForm.value.dateEnd;

        if (type === 'start') {
            const year = startDate.getFullYear();
            let month = startDate.getMonth();
            month = month + 1;
            const day = startDate.getDate();
            const dateString = `${month}/${day}/${year}`;
            // this.endDate is the String mm/dd/yyyy
            this.startDate = dateString;
        }
        if (type === 'end') {
            const year = endDate.getFullYear();
            let month = endDate.getMonth();
            month = month + 1;
            const day = endDate.getDate();
            const dateString = `${month}/${day}/${year}`;
            // this.endDate is the String mm/dd/yyyy
            this.endDate = dateString;
        }
    }

    onDeleteClick(data) {
        if (data.mode === 'deleteActivity') {
            console.log(data);
            this.activityService.deleteActivity(data.obj.id).subscribe(res => {
                if (this.messagesService.getExists()) {
                    this.dialogService.openDialog({
                        mode: 'infoDialog',
                        obj: this.messagesService.getMessage()
                    });
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
