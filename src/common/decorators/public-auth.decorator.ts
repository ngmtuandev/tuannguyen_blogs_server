import { SetMetadata } from '@nestjs/common';

// TODO: FIX .ENV
export const PublicAuth = () => SetMetadata('public_key', true);