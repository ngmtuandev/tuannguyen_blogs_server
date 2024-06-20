import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "src/database/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/database/repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})
export class UserModule{}