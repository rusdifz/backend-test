import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
// import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { EntityManager, FindOneOptions, Not } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, entityProperty] = args.constraints;

    if (!args.object['dummy']) {
      console.log('nonoo');

      const repository = this.entityManager.getRepository(EntityClass);

      const where: FindOneOptions = {
        where: { [entityProperty]: value },
      };

      if (args.object['id']) {
        where.where['id'] = Not(args.object['office_id']);
      }

      const foundEntity = await repository.findOne(where);

      return !foundEntity;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be unique`;
  }
}

export function IsUnique(
  entityClass: any,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityClass, field, validationOptions],
      validator: IsUniqueConstraint,
    });
  };
}
