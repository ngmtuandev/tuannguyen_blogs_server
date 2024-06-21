import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "src/database/entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/database/repository";
import { SendMailerService } from "../mailer";
import { SendMailerModule } from "../mailer/send-mailer.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), SendMailerModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, SendMailerService]
})
export class UserModule{}