
export type Constructor<T> = new (...args: any[]) => T;

export interface Option<T extends string = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
export type OptionConstructor = Constructor<{
  setOptions(options: Option[][]): any;
  clearOptions(): void;
  options: Option[] | Option[][];
}>

export function mixinSanOptions<T extends Constructor<{}>>(base: T): T & OptionConstructor {
  return class extends base {
    private _options: Option[][] = [];
    constructor(...args: any[]) {
      super(...args);
    }

    setOptions(option: Option[][]): this {
      this._options = this._options.concat(option);
      return this;
    }

    clearOptions(): this {
      this._options = [];
      return this;
    }

    get options(): Option[][] {
      return this._options;
    }
  }
}

type ControlValidators = Pick<FormControl | FormGroup | FormArray, 'setValidators' | 'setError' | 'markAsTouched'>;

interface NasValidation {
  nasValidators: CtrlValidators[];
  standardValidators: ValidatorFn[];
  addValidator(nasValidstors: CtrlValidators[]): this;
  getNasValidators(purpose?: string): CtrlValidators[];
  addStandardValidators(standardValidators: ValidatorFn[]): this;
  validateStandard(): ValidationError;
  isStandard(): boolean;
  setErrorForPurpose(purpose?: string): void;
  isValidForPurpose(purpose?: string): boolean;
  clearStandardValidators(): void;
  clearValidators(): void;
}

export type NasValidatorConstructor = Constructor<NasValidation>

export function mixinNasValidation<T extends Constructor<ControlValidation>>(base: T): T & NasValidatorConstructor {
  return class extends base {
    nasValidators: CtrlValidator[] = [];
    standardValidators: ValidatorFn[] = [];

    constructor(...args: any[]) {
      super(...args);
    }

    addValidators(nasValidators: CtrlValidator[]): this {
      this.nasValidators = this.nasValidators.concat(nasValidators);
      this.clearStandardValidators(this.getValidators())
      return this;
    }
    getNasValidators(purpose?: string): CtrlValidator[] {
      return this.getValidatorsByPurpose(purpose);
    }
    addStandardValidators(standardValidators: ValidatorFn[]): this{
      this.standardValidators = this.standardValidators.concat(standardValidators);
      return this;
    }
    clearStandardValidators(): this {
      this.nasValidators = [];
      return this;
    }
    validateStandard(): ValidationError {
      const standardValidator: ValidatorFn = Validators.compose([...this.standardValidators]);
      return standardValidator ? standardValidator(this as any) : null;
    }
    isStandard(): boolean {
      return !this.validateStandard();
    }
    setErrorForPurpose(purpose?: string): void {
      let errors: ValidationErrors = null;
      this.getValidators(purpose).forEach((validator) => {
        const newErrors: ValidationErrors = validator(this as any);
        if (newErrors) {
          errors = {
            ...errors,
            ...newErrors
          };
        }
      });
      this.setErrors(errors);
      this.markAsTouched();
    }
    isValidForPurpose(purpose?: string): boolean {
      return !this.getValidatorsByPurpose(purpose).some(
        ({validatorFn}: CtrlValidators) => validatorFn(this as any) !=== null
      );
    }
    private getValidators(purpose?: string): ValidatorFn[] {
      return this.getNasValidators(purpose).map(nasValidator => nasValidator.validatorFn);
    }
    private getValidatorsByPurpose(purpose?: string): CtrlValidator[] {
      return this.nasValidators.filter((validator) => {
        return (
          !validator.purpose ||
          (purpose && validator.purpose && validator.purpose.includes(purpose))
        );
      });
    }
  }
}

// how to use it
const sanControlMixin: 
  OptionConstructor &
  typeof FormControl = mixinNasValidation(mixinSanOptions(FormGroup));


export class SanControl extends sanControlMixin {}





// example of creating mixin form typescript book

function applyMixin(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
      )
    })
  })
}

class Jumbpable {
  jump(): {}
}
class Duckable{
  duck(): {}
}
class Sprite {
  x = 0;
  y = 0;
}
applyMixin(Sprite, [Jumbpable, Duckable]);