import { ApiResponseOptions } from '@nestjs/swagger';
import { SwgLogin } from './response.swagger';

export const swgLoginOK: ApiResponseOptions = {
  description: 'success',
  type: SwgLogin,
};
