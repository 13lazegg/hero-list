import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Superhero } from '../schemas';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

    private jsonUrl = 'assets/json/initial-heros.json';

    constructor(private http: HttpClient) { }

    getSuperheroes(): Observable<Superhero[]> {
        return this.http.get<{ superheroes: Superhero[] }>(this.jsonUrl)
        .pipe(map(response => response.superheroes));
    }

    getSuperheroById(id: number): Observable<Superhero> {
        return this.getSuperheroes().pipe(
            map(superheroes => {
                const superhero = superheroes.find(hero => hero.id === id);
                if (!superhero) {
                throw new Error(`Superhero with id ${id} not found`);
                }
                return superhero;
            }),
            catchError(error => {
                console.error(error);
                return of(undefined as any);
            })
        );
    }

    updateSuperhero(superhero: Superhero): Observable<Superhero> {
        return of(superhero);
    }

    deleteSuperhero(id: number): Observable<void> {
        return of(undefined);
    }

    addSuperhero(superhero: Superhero): Observable<Superhero> {
        return of(superhero);
    }
}