import { Component} from '@angular/core';
// import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HEROES } from './mock-heroes';
import { NgFor } from '@angular/common';
import { Hero } from './hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../service/hero.service';
import { MessageService } from '../service/message.service';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [FormsModule,NgFor,RouterLink],
  standalone: true,
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name=name.trim();
    if (!name) {return ;}
    this.heroService.addHero({ name } as Hero).subscribe(hero => {this.heroes.push(hero);})  
  }

  delete(hero:Hero):void{
    this.heroes=this.heroes.filter(delhero=>delhero!=hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}






// export class HeroesComponent {
//   heroes: Hero[] = [];
//   selectedHero?: Hero;

//   onSelect(hero: Hero): void {
//     this.selectedHero = hero;
//     this.messageService.replace('Selected hero: ' + this.selectedHero.name);
//   }
//   constructor(private heroService: HeroService, private messageService: MessageService) { }

//   getHeroes(): void {
//     this.heroService.getHeroes().subscribe(heroes=> this.heroes=heroes);
//   }

//   ngOnInit(): void {
//     this.getHeroes();

//   }
// }

    

