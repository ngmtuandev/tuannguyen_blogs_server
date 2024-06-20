import {
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  
  export function isPassword(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {

      registerDecorator({
        name: 'isPassword',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, _) {
            return (
              typeof value === 'string' &&
              /[A-Z]/.test(value) &&
              /[a-z]/.test(value) &&
              /[0-9]/.test(value) &&
              /[@$!%*?&]/.test(value)
            );
          },
          defaultMessage(_) {
            return 'Password must contain at least 1 uppercase letter, 1 number, 1 lowercase letter, and 1 special character';
          },
        },
      });
    };
  }
  