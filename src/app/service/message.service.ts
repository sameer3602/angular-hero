import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: string [] = [];

  add(message: string) {
    this.clear(); // Remove all previous messages
    this.messages.push(message);
  }
  replace(message: string) {
    this.clear(); // Remove all previous messages
    this.add(message); // Add the new message
  }


  clear() {
    this.messages = [];

  }

  // The constructor is empty because we don't need to initialize anything in this service.
  constructor() { }
}
