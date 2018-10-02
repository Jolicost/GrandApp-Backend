import { Injectable } from '@angular/core';
import { Observable, Subject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialog = new Subject<any>(); // 发送器，通知有变化
  dialog$ = this.dialog.asObservable();    // 数据储存的地方， 可以被subscribe()然后就可以获取数据


  constructor() { }

  openDialog(mode) {
    this.dialog.next(mode);  // emit有变化，并且传送新的value
  }
}
