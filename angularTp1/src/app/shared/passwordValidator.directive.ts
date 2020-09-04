import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('cpass');

  return password && confirmPassword && password.value === confirmPassword.value ? { 'passwordValidation': true } : null;
};

@Directive({
  selector: '[appPasswordValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: passwordValidatorDirective, multi: true }]
})
export class passwordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordValidator(control)
  }
}

