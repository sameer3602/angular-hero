import { Injectable } from '@angular/core';
import { Hero } from '../heroes/hero';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})


export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  } 
  
  constructor() { }

  // Overrides the genId method to ensure that a hero always has an id. 
  genId(heroes: Hero[]):number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  } 
}
