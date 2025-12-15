import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  template: `
   <div></div>

  `,
  styles: `


  `,
})
export default class PortadaComponent implements OnInit {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
readonly router = inject(Router);

  ngOnInit() {
  if (this._storage()!.usuarioLogin.perfilUsuario!='adm_corr'){
     this.router.navigate(['inicio']);

  }
}
}
