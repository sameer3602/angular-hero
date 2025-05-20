import { Component} from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { MessageComponent } from "./message/message.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ MessageComponent,RouterOutlet,RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone  : true,
})
export class AppComponent {
  title = 'Tour of Heroes';
}
