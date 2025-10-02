import {
  Component,
  input,
  signal,
  ViewChildren,
  ElementRef,
  QueryList,
  inject,
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
import { IIngresarDocumento } from '../modelo/ingresoSolicitud-Interface';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { CuestionarioService } from '../service/cuestionario.service';

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
    MatCardModule,
    MatDivider,
  ],
})
export class CuestionarioComponent {
  idSolicitud = input.required<string>();
  documentForm = signal(inject(FormBuilder).group({}));
  documentos = signal<IIngresarDocumento[]>([]);

  ngOnInit() {
    const base = this.cuestionarioService.getDocumentosBase();
    const id = Number(this.idSolicitud());

    const documentosConId = base.map((doc) => ({
      ...doc,
      p_id_solicitud: id,
    }));

    this.documentos.set(documentosConId);
  }

  bloquearSeccion2 = signal(true);

  @ViewChildren('fileInputs') fileInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private cuestionarioService = inject(CuestionarioService);

  abrirInputArchivo(nombre: string) {
    const id = this.sanitizarNombre(nombre);
    const input = this.fileInputs.find((ref) => ref.nativeElement.id === id);
    input?.nativeElement.click();
  }

  sanitizarNombre(nombre: string): string {
    return 'fileInput_' + nombre.replace(/\s+/g, '_');
  }

  onFileSelected(event: Event, doc: IIngresarDocumento) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const actualizados = this.documentos().map((d) =>
        d.p_id_documento_adjunto === doc.p_id_documento_adjunto
          ? {
              ...d,
              p_id_solicitud: Number(this.idSolicitud()),
              p_ruta_documento_origen: this.generarRuta('origen', file.name),
              p_ruta_documento_destino: this.generarRuta('destino', file.name),
              p_fecha_creacion: new Date().toISOString(),
              p_usuario_creacion: 'Mauricio Lufin',
            }
          : d
      );

      this.documentos.set(actualizados);

      if (doc.p_id_documento_adjunto === 'Cuestionario de cotización') {
        this.bloquearSeccion2.set(false);
      }

      const documentoActualizado = actualizados.find(
        (d) => d.p_id_documento_adjunto === doc.p_id_documento_adjunto
      );

      if (documentoActualizado) {
        this.cuestionarioService
          .postAgregaDocumento(documentoActualizado)
          .subscribe({
            next: (res) => {
              console.log('Documento ingresado:', res.estado_creacion);
            },
            error: (err) => {
              console.error('Error al ingresar documento:', err);
            },
          });
      }
    }
  }

  generarRuta(tipo: 'origen' | 'destino', nombreArchivo: string): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    return `/${tipo}/${año}/${mes}/${nombreArchivo}`;
  }

  eliminarDocumento(doc: IIngresarDocumento) {
    const actualizados = this.documentos().map((d) => {
      if (d.p_id_documento_adjunto === doc.p_id_documento_adjunto) {
        return {
          ...d,
          p_ruta_documento_origen: '',
          p_ruta_documento_destino: '',
          p_fecha_creacion: '',
          p_usuario_creacion: '',
        };
      }

      if (doc.p_id_documento_adjunto === 'Cuestionario de cotización') {
        return {
          ...d,
          p_ruta_documento_origen: '',
          p_ruta_documento_destino: '',
          p_fecha_creacion: '',
          p_usuario_creacion: '',
        };
      }

      return d;
    });

    this.documentos.set(actualizados);

    if (doc.p_id_documento_adjunto === 'Cuestionario de cotización') {
      this.bloquearSeccion2.set(true);
    }
  }

  archivoObligatorioCargado(): boolean {
    const doc = this.documentos().find(
      (d) => d.p_id_documento_adjunto === 'Cuestionario de cotización'
    );
    return !!doc?.p_ruta_documento_origen;
  }

  guardarSolicitud() {
    console.log('Solicitud guardada con los siguientes documentos:');
    this.documentos().forEach((doc) => {
      console.log(
        `${doc.p_id_documento_adjunto}: ${
          doc.p_ruta_documento_origen || 'No cargado'
        }`
      );
    });
  }
}
