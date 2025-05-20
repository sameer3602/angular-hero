import { Component ,OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable,Subject } from 'rxjs';
import { Hero } from '../heroes/hero';
import { HeroService } from '../service/hero.service';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-hero-search',
  imports: [RouterLink,NgFor,AsyncPipe],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css',
  standalone: true,
})
export class HeroSearchComponent implements OnInit{

    heroes$!: Observable<Hero[]>;  /// this is an observable of the heroes array  
    private searchTerms = new Subject<string>(); /// this is a subject that will emit the search terms entered by the user
    constructor(private heroService: HeroService) { } /// this is the constructor that will inject the hero service into the component
    search(term: string): void { /// this is the method that will be called when the user enters a search term
        this.searchTerms.next(term); /// this will emit the search term to the subject
    } /// this is the method that will be called when the user enters a search term           


    ngOnInit(): void { /// this is the method that will be called when the component is initialized
        this.heroes$ = this.searchTerms.pipe( /// this will create an observable of the search terms
            debounceTime(300), /// this will wait for 300 milliseconds before emitting the search term
            distinctUntilChanged(), /// this will only emit the search term if it is different from the previous one
            switchMap((term: string) => this.heroService.searchHeroes(term)), /// this will call the searchHeroes method of the hero service and return the observable of heroes
        );
    }

}
