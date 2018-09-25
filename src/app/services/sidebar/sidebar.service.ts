import { Injectable } from '@angular/core';
import { Observable, Subject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private opened = new Subject<string>(); // 发送器，通知有变化
  opened$ = this.opened.asObservable();    // 数据储存的地方， 可以被subscribe()然后就可以获取数据

  constructor() { }

  changeSidebarStatus(value) {
    this.opened.next(value);
  }
}
