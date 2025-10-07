// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatLabel, MatFormField, MatFormFieldModule } from "@angular/material/form-field";
// import { MatInputModule } from '@angular/material/input';
// import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-alertas',
//   standalone: true,
//   imports: [MatFormFieldModule, MatInputModule, MatButtonModule,FormsModule],
//   templateUrl: './alertas.component.html',
//   styleUrl: './alertas.component.css'
// })
// export default class AlertasComponent {
//   durationInSeconds = 5;
// constructor(private _snackBar: MatSnackBar) {}

//   openSnackBar(message: string, action: string) {
//     this._snackBar.open(message, action);
//   }






//   openSnackBar2() {
//     this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
//       duration: this.durationInSeconds * 1000,
//     });
//   }
// }

// export class PizzaPartyAnnotatedComponent {
//   snackBarRef = inject(MatSnackBarRef);
// }



import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

// Componente personalizado para el snackbar
@Component({
  selector: 'app-pizza-party',
  standalone: true,
  template: `<span>¡Mensaje de Prueba!</span>`,
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef<PizzaPartyAnnotatedComponent>);
}

// Componente principal
@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css'
})
export default class AlertasComponent {
  mostrar = false;
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openSnackBar2() {
    console.log('Snackbar2 triggered');
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }


  ////sweetalert2
  mostrarAlertaDraggable() {
    Swal.fire({
      title: 'Grabado',
      icon: 'success',
      draggable: true
    });
  }

  ////Sweetalert2 con opciones
  mostrarAlertaDraggable2() {
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No Guardar`,
      cancelButtonText:"Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Los cambios fueron guardados!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se grabaron los cambios", "", "info");
      }
    });
  }


  mostrarAlertaBootstrap() {
    this.mostrar = true;
  }
  cerrarAlertaBootstrap() {
    this.mostrar = false;
  }
}
