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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ConfirmacionSolicitudDialogComponent } from '../confirmacion-solicitud/confirmacion-solicitud.component';
import { ICuestionario } from '../modelo/ingreso-solicitud';

@Component({
  selector: 'app-cuestionario-documentos',
  standalone: true,
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatStepperModule,
    MatInputModule,
    MatCardModule
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

  @ViewChildren('fileInputs') fileInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  abrirInputArchivo(nombre: string) {
    const id = this.sanitizarNombre(nombre);
    const input = this.fileInputs.find((ref) => ref.nativeElement.id === id);
    input?.nativeElement.click();
  }

  sanitizarNombre(nombre: string): string {
    return 'fileInput_' + nombre.replace(/\s+/g, '_');
  }

  onFileSelected(event: Event, doc: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validación de tipo PDF
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF.');
        input.value = ''; // Limpiar selección
        return;
      }

      // Actualizar el signal completo
      const nuevosDocumentos = this.documentos().map((d) => {
        if (d.id === doc.id) {
          return {
            ...d,
            archivo: file.name,
            archivoNombre: file.name,
          };
        }
        return d;
      });

      this.documentos.set(nuevosDocumentos);
    }
  }

  eliminarDocumento(doc: any) {
    const nuevosDocumentos = this.documentos().map((d) => {
      if (d.id === doc.id) {
        return {
          ...d,
          archivo: '',
          archivoNombre: 'Sin documento cargado',
        };
      }
      return d;
    });

    this.documentos.set(nuevosDocumentos);
  }

  guardarSolicitud() {
    console.log('Solicitud guardada con los siguientes documentos:');
    this.documentos().forEach((doc) => {
      console.log(`${doc.nombre}: ${doc.archivo || 'No cargado'}`);
    });
  }


}
