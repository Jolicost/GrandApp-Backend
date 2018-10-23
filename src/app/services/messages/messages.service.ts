import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message;
  constructor() { }

  setMessage(message) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  getExists(): boolean {
    return this.message;
  }
}
