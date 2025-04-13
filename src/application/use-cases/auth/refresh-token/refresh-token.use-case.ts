import { JwtTokenFactoryInterface } from '../../../factories/jwt-token/interfaces/jwt-token.factory.interface';
import { JwtTokenInterface } from '../../../factories/jwt-token/interfaces/jwt-token.interface';

export class RefreshTokenUseCase {
  constructor(private readonly tokenFactory: JwtTokenFactoryInterface) {}

  /**
   * Executa o processo de renovação do token de acesso.
   * @param input Objeto contendo o token de refresh.
   * @returns Uma promessa com o novo token de acesso.
   * @throws Lança um erro se o payload do token for inválido.
   */
  async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
    // Verifica se o token de refresh é válido
    const payload = await this.tokenFactory.verifyToken(input.refreshToken);

    // Gera um novo token de acesso com base no ID do usuário e email
    const accessToken = await this.tokenFactory.generateAccessToken(
      payload.sub,
      payload.email,
    );

    // Retorna o novo token de acesso
    return { accessToken };
  }
}

export type RefreshTokenInput = {
  refreshToken: string;
};

export type RefreshTokenOutput = {
  accessToken: JwtTokenInterface;
};
