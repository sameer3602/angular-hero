import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero';
import { HeroService } from '../service/hero.service';
import { NgFor } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeroSearchComponent } from "../hero-search/hero-search.component";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  imports: [NgFor, RouterLink, RouterModule, HeroSearchComponent],
  standalone: true, 
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 4)); // Get the first five heroes from the array
  }
}