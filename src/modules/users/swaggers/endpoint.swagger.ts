import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwgDetailUser,
  SwgListUser,
  SwgUpdateUser,
  SwgCreateUser,
  SwgPathcUser,
} from './response.swagger';

export const swgGetListOK: ApiResponseOptions = {
  description: 'success',
  type: SwgListUser,
};

export const swgGetDetailOK: ApiResponseOptions = {
  description: 'success',
  type: SwgDetailUser,
};

export const swgCreateOK: ApiResponseOptions = {
  description: 'success',
  type: SwgCreateUser,
};

export const swgUpdateOK: ApiResponseOptions = {
  description: 'success',
  type: SwgUpdateUser,
};

export const swgPatchOK: ApiResponseOptions = {
  description: 'success',
  type: SwgPathcUser,
};
