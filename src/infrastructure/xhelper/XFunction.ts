import * as bcrypt from 'bcrypt';
import { classToPlain, plainToClass } from 'class-transformer';
export const XFunction = {
  hashPassword: async function (password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  },
  convertEntityTo: async function (entityClass: any, dto: any) {
    const dtoInstance = plainToClass(dto, entityClass);
    return classToPlain(dtoInstance, { excludeExtraneousValues: true });
  },
};
