import { Directive, ElementRef, HostListener, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDirectivaSoloDecimalNumeros]',
  standalone: true
})
export class SoloDecimalNumerosDirective {

    // InputSignal para los decimales permitidos, con un valor por defecto.
  decimales = input(2);

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input') onInput(): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let value = inputElement.value;

    // Reemplazar la coma por un punto para un manejo numérico consistente.
    value = value.replace(/,/g, '.');

    // Permitir solo dígitos y un solo punto.
    const sanitizedValue = value.replace(/[^0-9.]/g, '');

    // Asegurar que solo haya un punto decimal.
    const parts = sanitizedValue.split('.');
    if (parts.length > 2) {
      inputElement.value = parts[0] + '.' + parts.slice(1).join('');
    } else {
      inputElement.value = sanitizedValue;
    }
  }

  @HostListener('blur') onBlur(): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let value = inputElement.value;

    // Limpiar el valor para el modelo (cambiar la coma por punto)
    value = value.replace(/,/g, '.');
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      // Formatear a la cantidad de decimales especificada por el signal.
      const formattedValue = numericValue.toFixed(this.decimales());

      // Reemplazar el punto por una coma para la visualización.
      this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue.replace(/\./g, ','));
    } else {
      // Si no es un número válido, limpiar el input.
      this.renderer.setProperty(this.el.nativeElement, 'value', '');
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text').replace(/,/g, '.') || '';
    const sanitizedPastedText = pastedText.replace(/[^0-9.]/g, '');

    // Insertar el texto saneado en el input.
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const start = inputElement.selectionStart || 0;
    const end = inputElement.selectionEnd || 0;
    const newValue = inputElement.value.substring(0, start) + sanitizedPastedText + inputElement.value.substring(end);

    this.renderer.setProperty(inputElement, 'value', newValue);
    // Disparar el evento de input para que se ejecute el formato.
    inputElement.dispatchEvent(new Event('input'));
  }

}
