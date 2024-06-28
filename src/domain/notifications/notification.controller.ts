import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('find-all')
  async findAll(@Request() req: Request) {
    try {
      const result = await this.notificationService.findAll(req);
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          messageApi.SUCCESS,
          result,
          undefined,
          true,
        );
      }
      return new Response(
        STATUS_CODE.FAILURE,
        undefined,
        messageApi.FAIL,
        undefined,
        false,
      );
    } catch (error) {
      return new Response(
        STATUS_CODE.FAILURE,
        null,
        messageApi.FAIL,
        undefined,
        false,
      );
    }
  }

  @Get('find-by-id/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.notificationService.findOneOfNotification(id);
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          messageApi.SUCCESS,
          result,
          undefined,
          true,
        );
      }
      return new Response(
        STATUS_CODE.FAILURE,
        undefined,
        messageApi.FAIL,
        undefined,
        false,
      );
    } catch (error) {
      return new Response(
        STATUS_CODE.FAILURE,
        null,
        messageApi.FAIL,
        undefined,
        false,
      );
    }
  }
}
