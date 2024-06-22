import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/infrastructure/dto';
import { Roles } from 'src/common/decorators';
import { ROLE_CODE } from 'src/infrastructure/enum';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(ROLE_CODE.Admin)
  @Post()
  async create(@Body() postCreateInfo: CreatePostDto) {
    try {
      const result = await this.postService.create(postCreateInfo.post, postCreateInfo.postTrans)
    //   if (result) {
    //     return new Response(
    //       STATUS_CODE.SUCCESS,
    //       undefined,
    //       messageApi.SUCCESS,
    //       undefined,
    //       true,
    //     );
    //   }
    //   return new Response(
    //     STATUS_CODE.FAILURE,
    //     undefined,
    //     messageApi.FAIL,
    //     undefined,
    //     false,
    //   );
    } catch (error) {
    console.log("🚀 ~ PostController ~ create ~ error:", error)
    //   return new Response(
    //     STATUS_CODE.FAILURE,
    //     null,
    //     messageApi.FAIL,
    //     undefined,
    //     false,
    //   );
    }
  }
}
