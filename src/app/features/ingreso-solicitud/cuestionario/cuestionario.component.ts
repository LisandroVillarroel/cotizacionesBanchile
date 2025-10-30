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
import { HttpErrorResponse } from '@angular/common/http';
import { CuestionarioService } from '../service/cuestionario.service';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import {
  IDocumentoLista,
  DatosDocumentoInterface,
} from '../modelo/ingresoSolicitud-Interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';

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
  idSolicitud = input.required<number>();


  notificacioAlertnService= inject(NotificacioAlertnService);

  documentForm = signal(inject(FormBuilder).group({}));
  documentos = signal<IIngresarDocumento[]>([]);

  @ViewChildren('fileInputs') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private cuestionarioService = inject(CuestionarioService);
  private storage = inject(StorageService);

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

      const sesion = this.storage.get('sesion') as ISesionInterface;
      const usuarioLogueado =
        sesion?.usuarioLogin?.usuario ?? 'UsuarioDesconocido';

      doc.p_id_solicitud = Number(this.idSolicitud());
      doc.p_ruta_documento_origen = this.generarRuta('origen', file.name);
      doc.p_ruta_documento_destino = this.generarRuta('destino', file.name);
      doc.p_fecha_creacion = new Date().toISOString();
      doc.p_usuario_creacion = usuarioLogueado;

      this.cuestionarioService.postAgregaDocumento(doc).subscribe({
        next: (res) => {
          console.log('Documento ingresado:', res.vcEstadoCreacion);

          if (res.p_corr_documento != null) {
            doc.p_corr_documento = res.p_corr_documento;
          }

          this.consultarDocumentos();

          if (doc.p_id_documento_adjunto === 'Cuestionario de cotización') {
            this.bloquearSeccion2.set(false);
          }
        },
        error: (err) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });

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

  consultarDocumentos() {
    const idSolicitud = Number(this.idSolicitud());
    console.log('ID de solicitud enviado al backend:', idSolicitud);

    const filtro = { p_id_solicitud: idSolicitud };
    console.log('Filtro enviado al backend:', filtro);

    this.cuestionarioService.postListadoDocumento(filtro).subscribe({
      next: (res: DatosDocumentoInterface) => {
        if (res.codigo === 200) {
          const documentosFiltrados: IIngresarDocumento[] = res.p_cursor
            .filter(
              (doc) => doc.id_documento_adjunto && doc.ruta_documento_origen
            )
            .map((doc: IDocumentoLista) => ({
              p_id_solicitud: idSolicitud,
              p_id_documento_adjunto: doc.id_documento_adjunto,
              p_documento_principal: doc.documento_principal,
              p_ruta_documento_origen: doc.ruta_documento_origen,
              p_ruta_documento_destino: doc.ruta_documento_destino,
              p_fecha_creacion: doc.fecha_creacion,
              p_usuario_creacion: doc.usuario_creacion,
              p_corr_documento: doc.corr_documento,
            }));

          console.log(
            `Documentos para solicitud ${idSolicitud}:`,
            documentosFiltrados
          );
        }
      },
      error: (err: HttpErrorResponse) => {
        this.notificacioAlertnService.error('ERROR','Error Inesperado');
      },
    });
  }

  eliminarDocumento(doc: IIngresarDocumento) {
    const idSolicitud = Number(this.idSolicitud());

    if (doc.p_corr_documento == null) {
      this.notificacioAlertnService.warning('CUESTIONARIO', 'No se puede eliminar el documento porque no tiene correlativo asignado.');
      return;
    }

    // Verificar si es el documento obligatorio
    const esObligatorio =
      doc.p_id_documento_adjunto === 'Cuestionario de cotización';

    if (esObligatorio) {
      // Verificar si hay documentos opcionales cargados
      const documentosOpcionales = this.documentos().filter(
        (d) =>
          d.p_id_documento_adjunto !== 'Cuestionario de cotización' &&
          d.p_ruta_documento_origen
      );

      if (documentosOpcionales.length > 0) {
        this.notificacioAlertnService.warning('CUESTIONARIO','Primero debe eliminar los documentos opcionales antes de eliminar el documento obligatorio.');
        return;
      }
    }

    const corr = doc.p_corr_documento;
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

          if (esObligatorio) {
            this.bloquearSeccion2.set(true);
          }
        },
        error: (err) => {
          this.notificacioAlertnService.error('ERROR','Error Inesperado');
        },
      });
  }
}
