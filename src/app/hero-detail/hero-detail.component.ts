import { Component,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../heroes/hero';
import { NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import  { Location } from '@angular/common';
import { HeroService } from '../service/hero.service';


@Component({
  selector: 'app-hero-detail',
  imports: [FormsModule,NgIf,UpperCasePipe,RouterModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
  standalone: true,
})


export class HeroDetailComponent {
    @Input() hero?: Hero;

    constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location  ){}

    ngOnInit(): void {
      this.getHero();
    }

    getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    }
    goBack(): void {
      this.location.back();
    }
    save():void {
      if (this.hero){
        this.heroService.updateHero(this.hero)
          .subscribe(() => this.goBack());
      }
    }

}
