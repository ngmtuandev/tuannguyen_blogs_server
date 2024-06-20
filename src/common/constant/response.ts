import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class Response {
  @IsNumber()
  statusCode: number;

  @IsString()
  @IsOptional()
  message?: string | undefined;

  @IsOptional()
  data?: any;

  @IsOptional()
  token?: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  constructor(statusCode: number, message?: string, data?: any, token?: string, status?: boolean) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.token = token;
    this.status = status;
}
}
