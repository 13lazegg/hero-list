import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SuperheroState } from './store/superhero.reducer';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loading$: Observable<boolean> = this.store.select(state => state.superheroes.loading);

  constructor(private store: Store<{ superheroes: SuperheroState }>) { }
}
