import * as os from 'os';
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

  generateTokenRandom: function () {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    return token;
  },

  gererateIpNetworkForRedis: function () {
    const networkInterface = os.networkInterfaces();
    const result = {};

    for (const name of Object.keys(networkInterface)) {
      for (const net of networkInterface[name]) {
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
        if (net.family === familyV4Value && !net.internal) {
          if (!result[name]) {
            result[name] = [];
          }
          result[name].push(net.address);
        }
      }
      return Object.values(result)[0];
    }
  },
};
