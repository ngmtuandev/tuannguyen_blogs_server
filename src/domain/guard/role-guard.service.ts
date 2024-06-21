import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // TODO: FIX .ENV
    const requiredRoles = this.reflector.getAllAndOverride<any[]>('ROLES_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { userInfo } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => userInfo.role === role);
  }
}
