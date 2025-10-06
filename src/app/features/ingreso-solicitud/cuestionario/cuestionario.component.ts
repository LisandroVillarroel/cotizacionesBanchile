import {
  Component,
  input,
  signal,
  ViewChildren,
  ElementRef,
  QueryList,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';

@Component({
  selector: 'app-cuestionario-documentos',
  standalone: true,
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  private storage = inject(StorageService);

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

      // Obtener usuario logueado desde el storage
      const sesion = this.storage.get('sesion') as ISesionInterface;
      const usuarioLogueado =
        sesion?.usuarioLogin?.usuario ?? 'UsuarioDesconocido';

      // Modificación directa del objeto doc
      doc.p_id_solicitud = Number(this.idSolicitud());
      doc.p_ruta_documento_origen = this.generarRuta('origen', file.name);
      doc.p_ruta_documento_destino = this.generarRuta('destino', file.name);
      doc.p_fecha_creacion = new Date().toISOString();
      doc.p_usuario_creacion = usuarioLogueado;

      if (doc.p_id_documento_adjunto === 'Cuestionario de cotización') {
        this.bloquearSeccion2.set(false);
      }

      this.cuestionarioService.postAgregaDocumento(doc).subscribe({
        next: (res) => {
          console.log('Documento ingresado:', res.vcEstadoCreacion);

          if (res.p_corr_documento != null) {
            doc.p_corr_documento = res.p_corr_documento;
          }
        },
        error: (err) => {
          console.error('Error al ingresar documento:', err);
        },
      });

      // Resetear el input para permitir volver a cargar el mismo archivo
      input.value = '';
    }
  }

  generarRuta(tipo: 'origen' | 'destino', nombreArchivo: string): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    return `/${tipo}/${año}/${mes}/${nombreArchivo}`;
  }

  archivoObligatorioCargado(): boolean {
    const doc = this.documentos().find(
      (d) => d.p_id_documento_adjunto === 'Cuestionario de cotización'
    );
    return !!doc?.p_ruta_documento_origen;
  }

  eliminarDocumento(doc: IIngresarDocumento) {
    const idSolicitud = Number(this.idSolicitud());

    if (doc.p_corr_documento == null) {
      alert(
        'No se puede eliminar el documento porque no tiene correlativo asignado.'
      );
      return;
    }

    const corr = doc.p_corr_documento;

    // Obtener usuario logueado desde el storage
    const sesion = this.storage.get('sesion') as ISesionInterface;
    const usuarioLogueado =
      sesion?.usuarioLogin?.usuario ?? 'UsuarioDesconocido';

    this.cuestionarioService
      .postEliminaDocumento(idSolicitud, corr, usuarioLogueado)
      .subscribe({
        next: () => {
          doc.p_ruta_documento_origen = '';
          doc.p_ruta_documento_destino = '';
          doc.p_fecha_creacion = '';
          doc.p_usuario_creacion = '';

          if (doc.p_id_documento_adjunto === 'Cuestionario de cotización') {
            this.bloquearSeccion2.set(true);
          }

          console.log('Documento eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar documento:', err);
          alert(
            'No se pudo eliminar el documento. Verifica que esté correctamente cargado o contacta al administrador.'
          );
        },
      });
  }
}
