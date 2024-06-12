import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercase]',
  standalone: true
})
export class UppercaseDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const uppercasedValue = value.toUpperCase();
    if (this.ngControl.control) {
      this.ngControl.control.setValue(uppercasedValue, { emitEvent: false });
    }
  }

}
