import { createReducer, on } from '@ngrx/store';
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
import { Superhero } from '../schemas';

export interface SuperheroState {
  superheroes: Superhero[];
  loading: boolean;
  error: any;
}

export const initialState: SuperheroState = {
  superheroes: [],
  loading: true,
  error: null
};

export const superheroReducer = createReducer(
  initialState,
  on(loadSuperheroes, state => ({ ...state, loading: true })),
  on(loadSuperheroesSuccess, (state, { superheroes }) => ({
    ...state,
    superheroes,
    loading: false,
    error: null
  })),
  on(loadSuperheroesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(loadSuperhero, state => ({ ...state, loading: true })),
  on(loadSuperheroSuccess, (state, { superhero }) => ({
    ...state,
    superheroes: [...state.superheroes.filter(hero => hero.id !== superhero.id), superhero],
    loading: false,
    error: null
  })),
  on(loadSuperheroFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(updateSuperhero, state => ({ ...state, loading: true })),
  on(updateSuperheroSuccess, (state, { superhero }) => ({
    ...state,
    superheroes: state.superheroes.map((hero) => {
        return hero.id === superhero.id ? superhero : hero
    }),
    loading: false,
    error: null
  })),
  on(updateSuperheroFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(deleteSuperhero, state => ({ ...state, loading: true })),
  on(deleteSuperheroSuccess, (state, { id }) => ({
    ...state,
    superheroes: state.superheroes.filter(hero => hero.id !== id),
    loading: false,
    error: null
  })),
  on(deleteSuperheroFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(addSuperhero, state => ({ ...state, loading: true })),
  on(addSuperheroSuccess, (state, { superhero }) => ({
    ...state,
    superheroes: [...state.superheroes, { ...superhero, id: state.superheroes.length ? state.superheroes[state.superheroes.length - 1].id + 1 : 1 }],
    loading: false,
    error: null
  })),
  on(addSuperheroFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);