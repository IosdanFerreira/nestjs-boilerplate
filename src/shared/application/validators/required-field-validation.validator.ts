import { BadRequestError } from '@src/shared/domain/errors';
import { ValidatorInterface } from './validator.interface';

export class RequiredFieldValidation implements ValidatorInterface<any> {
  constructor(private readonly fieldName: string) {}

  /**
   * Valida se o campo obrigatório foi fornecido.
   *
   * @param input - O valor do campo a ser validado.
   * @throws BadRequestError - Se o campo não for fornecido ou estiver vazio.
   */
  validate(input: any): void {
    // Verifica se o valor do campo está vazio ou indefinido
    if (!input) {
      // Lança um erro indicando que o campo não pode ser vazio
      throw new BadRequestError('', [
        {
          property: this.fieldName,
          message: `${this.fieldName} não pode ser vazio`,
        },
      ]);
    }
  }
}
