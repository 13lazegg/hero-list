import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { SuperheroService } from '../services/superhero.service';
import {
  loadSuperheroes,
  loadSuperheroesSuccess,
  loadSuperheroesFailure,
  loadSuperhero,
  loadSuperheroSuccess,
  loadSuperheroFailure,
  updateSuperhero,
  updateSuperheroSuccess,
  updateSuperheroFailure,
  deleteSuperhero,
  deleteSuperheroSuccess,
  deleteSuperheroFailure,
  addSuperhero,
  addSuperheroSuccess,
  addSuperheroFailure
} from './superhero.actions';

@Injectable()
export class SuperheroEffects {
    delay = 2000;

    loadSuperheroes$ = createEffect(() =>
        this.actions$.pipe(
            delay(this.delay),
            ofType(loadSuperheroes),
            mergeMap(() =>
                this.superheroService.getSuperheroes().pipe(
                map(superheroes => loadSuperheroesSuccess({ superheroes })),
                catchError(error => of(loadSuperheroesFailure({ error })))
                )
            )
        )
      );
    
      loadSuperhero$ = createEffect(() =>
        this.actions$.pipe(
            delay(this.delay),
            ofType(loadSuperhero),
            mergeMap(action =>
                this.superheroService.getSuperheroById(action.id).pipe(
                map(superhero => {
                    if (superhero) {
                    return loadSuperheroSuccess({ superhero });
                    } else {
                    return loadSuperheroFailure({ error: `Superhero with id ${action.id} not found` });
                    }
                }),
                catchError(error => of(loadSuperheroFailure({ error })))
                )
            )
        )
      );
    
      updateSuperhero$ = createEffect(() =>
        this.actions$.pipe(
            delay(this.delay),
            ofType(updateSuperhero),
            switchMap(action =>
                this.superheroService.updateSuperhero(action.superhero).pipe(
                map(superhero => updateSuperheroSuccess({ superhero })),
                catchError(error => of(updateSuperheroFailure({ error })))
                )
            )
        )
      );
    
      deleteSuperhero$ = createEffect(() =>
        this.actions$.pipe(
            delay(this.delay),
            ofType(deleteSuperhero),
            mergeMap(action =>
                this.superheroService.deleteSuperhero(action.id).pipe(
                map(() => deleteSuperheroSuccess({ id: action.id })),
                catchError(error => of(deleteSuperheroFailure({ error })))
                )
            )
        )
      );

      addSuperhero$ = createEffect(() =>
        this.actions$.pipe(
            delay(this.delay),
            ofType(addSuperhero),
            mergeMap(action =>
                this.superheroService.addSuperhero(action.superhero).pipe(
                map(superhero => addSuperheroSuccess({ superhero })),
                catchError(error => of(addSuperheroFailure({ error })))
                )
            )
        )
      );
    
      constructor(
        private actions$: Actions,
        private superheroService: SuperheroService
      ) {}
}