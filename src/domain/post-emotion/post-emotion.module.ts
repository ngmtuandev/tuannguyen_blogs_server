import { Module } from "@nestjs/common";
import { PostEmotionController } from "./post-emotion.controller";
import { PostEmotionRepository } from "src/database/repository";
import { PostEmotionService } from "./post-emotion.service";

@Module({
    controllers: [PostEmotionController],
    providers: [PostEmotionRepository, PostEmotionService],
    exports: [],
    imports: []
})
export class PostEmotionModule {}