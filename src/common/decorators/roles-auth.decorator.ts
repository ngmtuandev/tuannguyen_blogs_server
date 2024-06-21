import { SetMetadata } from '@nestjs/common';

// TODO: FIX .ENV
export const Roles = (...roles: any[]) => SetMetadata('ROLES_KEY', roles);