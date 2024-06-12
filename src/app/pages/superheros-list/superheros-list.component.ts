import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SuperheroState } from '../../store/superhero.reducer';
import {
  loadSuperheroes,
  loadSuperhero,
  updateSuperhero,
  deleteSuperhero,
  addSuperhero
} from '../../store/superhero.actions';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Superhero } from '../../schemas';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { HeroFormDialogComponent } from '../../components/hero-form-dialog/hero-form-dialog.component';

@Component({
  selector: 'app-superheros-list',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [AsyncPipe, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './superheros-list.component.html',
  styleUrl: './superheros-list.component.scss'
})
export class SuperherosListComponent implements OnInit {
  title = 'heroes';
  superheroes$: Observable<Superhero[]> = this.store.select(state => state.superheroes.superheroes);
  loading$: Observable<boolean> = this.store.select(state => state.superheroes.loading);
  error$: Observable<any> = this.store.select(state => state.superheroes.error);

  dataSource!: MatTableDataSource<Superhero>;
  displayedColumns: string[] = ['id', 'nombre'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Superhero | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<{ superheroes: SuperheroState }>,
    public dialog: MatDialog
  ) {
    this.superheroes$.pipe()
    .subscribe({
        next: (response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = (data: Superhero, filter: string) => {
              return data.nombre.toLowerCase().includes(filter.toLowerCase());
            };
        }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadSuperheroes());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onLoadSuperhero(id: number): void {
    this.store.dispatch(loadSuperhero({ id }));
  }

  onUpdateSuperhero(superhero: Superhero): void {
    this.store.dispatch(updateSuperhero({ superhero }));
  }

  openConfirmDialog(superhero: Superhero): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSuperhero(superhero.id);
      }
    });
  }

  deleteSuperhero(id: number): void {
    this.store.dispatch(deleteSuperhero({ id }));
  }

  openAddHeroDialog(): void {
    const dialogRef = this.dialog.open(HeroFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addSuperhero(result);
      }
    });
  }

  openEditHeroDialog(hero: Superhero): void {
    const dialogRef = this.dialog.open(HeroFormDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onUpdateSuperhero(result);
      }
    });
  }

  addSuperhero(hero: Superhero): void {
    this.store.dispatch(addSuperhero({ superhero: hero }));
  }
}
