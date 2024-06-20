import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function matchPassword(
    propertyPassword: string,
    validationOptions?: ValidationOptions,
  ) {
    return (object: Object, propertyName: string) => {
      registerDecorator({
        name: 'matchPassword',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [propertyPassword],
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [password] = args.constraints;
            const relatedValue = (args.object as any)[password];
            return value === relatedValue;
          },
          defaultMessage(args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            return `${propertyName} must match ${relatedPropertyName}`;
          },
        },
      });
    };
  }
  