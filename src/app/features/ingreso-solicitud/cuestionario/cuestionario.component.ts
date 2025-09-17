import {
  Component,
  signal,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ICuestionario } from '../modelo/ingresoSolicitud-Interface';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuestionario-documentos',
  standalone: true,
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatStepperModule,
    MatInputModule,
    MatCardModule,
    MatDivider,
  ],
})
export class CuestionarioComponent {
  documentForm = signal(this.fb.group({}));

  documentos = signal<ICuestionario[]>([
    {
      id: 1,
      nombre: 'Cuestionario de cotización',
      obligatorio: true,
      archivo: '',
      archivoNombre: 'Sin documento cargado',
    },
    {
      id: 2,
      nombre: 'Carta Gantt',
      obligatorio: false,
      archivo: '',
      archivoNombre: 'Sin documento cargado',
    },
    {
      id: 3,
      nombre: 'Descripción de la obra',
      obligatorio: false,
      archivo: '',
      archivoNombre: 'Sin documento cargado',
    },
    {
      id: 4,
      nombre: 'Medidas de seguridad',
      obligatorio: false,
      archivo: '',
      archivoNombre: 'Sin documento cargado',
    },
    {
      id: 5,
      nombre: 'Plano/Layout de la obra',
      obligatorio: false,
      archivo: '',
      archivoNombre: 'Sin documento cargado',
    },
    {
      id: 6,
      nombre: 'Presupuesto',
      obligatorio: false,
      archivo: '',
      archivoNombre: 'Sin documento cargado',
    },
    {
      id: 7,
      nombre: 'Documentos adicionales',
      obligatorio: false,
      archivo: '',
      archivoNombre: 'Sin documento cargado',
    },
  ]);

  // Estado reactivo para habilitar/deshabilitar sección 2
  bloquearSeccion2 = signal(true);

  @ViewChildren('fileInputs') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  abrirInputArchivo(nombre: string) {
    const id = this.sanitizarNombre(nombre);
    const input = this.fileInputs.find((ref) => ref.nativeElement.id === id);
    input?.nativeElement.click();
  }

  sanitizarNombre(nombre: string): string {
    return 'fileInput_' + nombre.replace(/\s+/g, '_');
  }

  onFileSelected(event: Event, doc: ICuestionario) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const nuevosDocumentos = this.documentos().map((d) =>
        d.id === doc.id
          ? { ...d, archivo: file.name, archivoNombre: file.name }
          : d
      );

      this.documentos.set(nuevosDocumentos);

      // Habilitar sección 2 si se cargó el documento obligatorio
      if (doc.id === 1 && file.name) {
        this.bloquearSeccion2.set(false);
      }
    }
  }

  eliminarDocumento(doc: ICuestionario) {
    const nuevosDocumentos = this.documentos().map((d) => {
      if (d.id === doc.id) {
        return {
          ...d,
          archivo: '',
          archivoNombre: 'Sin documento cargado',
        };
      }

      // Si se eliminó el obligatorio, también limpiar los opcionales
      if (doc.id === 1 && d.id !== 1) {
        return {
          ...d,
          archivo: '',
          archivoNombre: 'Sin documento cargado',
        };
      }

      return d;
    });

    this.documentos.set(nuevosDocumentos);

    // Deshabilitar sección 2 si se eliminó el obligatorio
    if (doc.id === 1) {
      this.bloquearSeccion2.set(true);
    }
  }

  archivoObligatorioCargado(): boolean {
    const doc = this.documentos().find((d) => d.id === 1);
    return !!doc?.archivo;
  }

  guardarSolicitud() {
    console.log('Solicitud guardada con los siguientes documentos:');
    this.documentos().forEach((doc) => {
      console.log(`${doc.nombre}: ${doc.archivo || 'No cargado'}`);
    });
  }
}

