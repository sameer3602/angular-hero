import { Injectable } from '@angular/core';
import { Hero } from '../heroes/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';  
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService:MessageService,private http: HttpClient,) { }

  // getHeroes(): Observable<Hero[]>{
  //   const heroes = of(HEROES);  /// returns an observable of the heroes array from the mock-heroes.ts file
  //   this.messageService.add('HeroService: fetched heroes');  /// this message is added to the message service, which can be displayed in the message component
  //   return heroes;
  // }

  // getHero(id: number):Observable<Hero>{
  //   const hero=HEROES.find(h=> h.id ==id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id} and name=${hero.name}`); /// this message is added to the message service, which can be displayed in the message component
  //   return of(hero); 
  // } 

  private log(message: string) {
    this.messageService.add(message);
  }

  private heroesUrl = 'api/heroes';  // URL to web api
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(tap(_ => this.log('fetched heroes')),catchError(this.handleError<Hero[]>('getHeroes',[])))
  }

  private handleError<T>(operation ='operation', result?: T){
    return (error:any): Observable<T> =>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );}


  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, { responseType: 'text' }).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({'Content-type':'application/json'})
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((newHero:Hero)=> this.log(`added Hero with id =${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero') )
    );
  }

  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap( _=> this.log(`deleted hero id =${id}`)),
        catchError(this.handleError<Hero>('deleteHero')
    ))
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()){
      return of ([]);

    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x=> x.length ?
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', [])
      )
    )
  }
  

  
}
