import { Component} from '@angular/core';
import { MessageService } from '../service/message.service';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [NgFor,NgIf],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  constructor(public messageService: MessageService) { }
}
