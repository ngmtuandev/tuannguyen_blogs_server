import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { SessionCodeEntity } from '../entity';
import { CreateSessionCodeDto } from 'src/infrastructure/dto';

export class SessionCodeRepository extends GenericRepository<SessionCodeEntity> {
  protected repository: Repository<SessionCodeEntity>;
  protected entityManager: EntityManager;

  getEntityType(): EntityTarget<SessionCodeEntity> {
    return SessionCodeEntity;
  }

  async createSession(sessionCodeInfo: CreateSessionCodeDto) {
    const result = await this.repository.save(sessionCodeInfo);
    return result;
  }

  async findSession(code: number) {
    const result = await this.repository.findOneBy({ code });
    return result;
  }

  async deleteSession(id: number) {
    const result = await this.repository.delete(id);
    return result;
  }

  async findAllSession() {
    const result = await this.repository.find();
    return result;
  }
}
