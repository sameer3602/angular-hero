import { Component} from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { MessageComponent } from "./message/message.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeroFormComponent } from "./hero-form/hero-form.component";

@Component({
  selector: 'app-root',
  imports: [MessageComponent, RouterOutlet, RouterModule, HeroFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone  : true,
})
export class AppComponent {
  title = 'Tour of Heroes';
}
