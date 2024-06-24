import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SessionCodeRepository } from 'src/database/repository';

@Injectable()
export class ScheduledTasksService {
  private readonly logger = new Logger(ScheduledTasksService.name);
  constructor(private readonly sessionCodeRepository: SessionCodeRepository) {}

  @Cron('1 * * * * *')
  async handleCron() {
    this.logger.debug('Schedule delete session 1 second...');
    const sessionCodes = await this.sessionCodeRepository.findAllSession();

    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 50 * 1000);
    const expiredSessionCodes = sessionCodes.filter(
      (sessionCode) => sessionCode.createdAt < thirtySecondsAgo,
    );

    for (const sessionCode of expiredSessionCodes) {
      await this.sessionCodeRepository.deleteSession(sessionCode.id);
    }
  }
}
