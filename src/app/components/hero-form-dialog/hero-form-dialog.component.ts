import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Superhero } from '../../schemas';
import { UppercaseDirective } from '../../directives';
@Component({
  selector: 'app-hero-form-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDividerModule, UppercaseDirective],
  templateUrl: './hero-form-dialog.component.html',
  styleUrl: './hero-form-dialog.component.scss'
})
export class HeroFormDialogComponent {
  
  heroForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HeroFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Superhero
  ) {
    this.heroForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required], // Usar data?.nombre si existe
      poderes: this.fb.array([]),
      debilidades: this.fb.array([]),
      origen: [data?.origen || '', Validators.required], // Usar data?.origen si existe
      archienemigos: this.fb.array([]),
      descripcion: [data?.descripcion || '', Validators.required], // Usar data?.descripcion si existe
      imagen: [data?.imagen || '', Validators.required] // Usar data?.imagen si existe
    });

    // Llenar los formArrays de poderes, debilidades y archienemigos si existen en data
    if (data?.poderes && data?.poderes.length > 0) {
      data?.poderes.forEach(poder => this.addPoder(poder));
    }
    if (data?.debilidades && data?.debilidades.length > 0) {
      data?.debilidades.forEach(debilidad => this.addDebilidad(debilidad));
    }
    if (data?.archienemigos && data?.archienemigos.length > 0) {
      data?.archienemigos.forEach(archienemigo => this.addArchienemigo(archienemigo));
    }

    // Mostrar la imagen previa si está presente en data?.imagen
    if (data?.imagen) {
      this.previewImage = data?.imagen;
    }
  }

  get poderes(): FormArray {
    return this.heroForm.get('poderes') as FormArray;
  }

  get debilidades(): FormArray {
    return this.heroForm.get('debilidades') as FormArray;
  }

  get archienemigos(): FormArray {
    return this.heroForm.get('archienemigos') as FormArray;
  }

  createPoder(poder = ''): FormGroup {
    return this.fb.group({
      poder: [poder, Validators.required]
    });
  }

  createDebilidad(debilidad = ''): FormGroup {
    return this.fb.group({
      debilidad: [debilidad, Validators.required]
    });
  }

  createArchienemigo(archienemigo = ''): FormGroup {
    return this.fb.group({
      archienemigo: [archienemigo, Validators.required]
    });
  }

  addPoder(poder = ''): void {
    this.poderes.push(this.createPoder(poder));
  }

  addDebilidad(debilidad = ''): void {
    this.debilidades.push(this.createDebilidad(debilidad));
  }

  addArchienemigo(archienemigo = ''): void {
    this.archienemigos.push(this.createArchienemigo(archienemigo));
  }

  removePoder(index: number): void {
    this.poderes.removeAt(index);
  }

  removeDebilidad(index: number): void {
    this.debilidades.removeAt(index);
  }

  removeArchienemigo(index: number): void {
    this.archienemigos.removeAt(index);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // Verificar si el archivo es una imagen
      if (!file.type.startsWith('image')) {
        console.log('El archivo seleccionado no es una imagen.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.previewImage = reader.result;
        this.heroForm.patchValue({
          imagen: reader.result
        });
      };
    }
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const hero = {
        ...this.heroForm.value,
        poderes: this.heroForm.value.poderes.map((p: any) => p.poder),
        debilidades: this.heroForm.value.debilidades.map((d: any) => d.debilidad),
        archienemigos: this.heroForm.value.archienemigos.map((a: any) => a.archienemigo),
      };
      if(this.data) {
        hero.id = this.data.id;
      }
      this.dialogRef.close(hero);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
