import { createAction, props } from '@ngrx/store';
import { Superhero } from '../schemas';

export const loadSuperheroes = createAction('[Superhero] Load Superheroes');
export const loadSuperheroesSuccess = createAction(
  '[Superhero] Load Superheroes Success',
  props<{ superheroes: Superhero[] }>()
);
export const loadSuperheroesFailure = createAction(
  '[Superhero] Load Superheroes Failure',
  props<{ error: any }>()
);

export const loadSuperhero = createAction(
  '[Superhero] Load Superhero',
  props<{ id: number }>()
);
export const loadSuperheroSuccess = createAction(
  '[Superhero] Load Superhero Success',
  props<{ superhero: Superhero }>()
);
export const loadSuperheroFailure = createAction(
  '[Superhero] Load Superhero Failure',
  props<{ error: any }>()
);

export const updateSuperhero = createAction(
  '[Superhero] Update Superhero',
  props<{ superhero: Superhero }>()
);
export const updateSuperheroSuccess = createAction(
  '[Superhero] Update Superhero Success',
  props<{ superhero: Superhero }>()
);
export const updateSuperheroFailure = createAction(
  '[Superhero] Update Superhero Failure',
  props<{ error: any }>()
);

export const deleteSuperhero = createAction(
  '[Superhero] Delete Superhero',
  props<{ id: number }>()
);
export const deleteSuperheroSuccess = createAction(
  '[Superhero] Delete Superhero Success',
  props<{ id: number }>()
);
export const deleteSuperheroFailure = createAction(
  '[Superhero] Delete Superhero Failure',
  props<{ error: any }>()
);
export const addSuperhero = createAction(
    '[Superhero] Add Superhero',
    props<{ superhero: Superhero }>()
);
export const addSuperheroSuccess = createAction(
    '[Superhero] Add Superhero Success',
    props<{ superhero: Superhero }>()
);
export const addSuperheroFailure = createAction(
    '[Superhero] Add Superhero Failure',
    props<{ error: any }>()
);