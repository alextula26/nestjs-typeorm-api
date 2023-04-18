import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/*import { User, UserSchema } from './api/user/schemas';
import { Blog, BlogSchema } from './api/blog/schemas';
import { Post, PostSchema } from './api/post/schemas';
import { Comment, CommentSchema } from './api/comment/schemas';
import { Device, DeviceSchema } from './api/device/schemas';
import { Session, SessionSchema } from './api/session/schemas';
import { LikeStatus, LikeStatusSchema } from './api/likeStatus/schemas';
import { Ban, BanSchema } from './api/ban/schemas';*/

import { AuthController } from './api/auth/auth.controller';
import { UserController } from './api/user/user.controller';
/*import { BlogController } from './api/blog/blog.controller';
import { BloggerController } from './api/blog/blogger.controller';
import { SABlogController } from './api/blog/sa-blog.controller';
import { PostController } from './api/post/post.controller';*/
import { DeviceSqlController } from './api/device/device.sql.controller';
// import { CommentController } from './api/comment/comment.controller';
import { TestingController } from './api/testing/testing.controller';

import { AuthService } from './api/auth/auth.service';
// import { UserService } from './api/user/user.service';
/*import { BlogService } from './api/blog/blog.service';
import { PostService } from './api/post/post.service';
import { CommentService } from './api/comment/comment.service';
import { DeviceService } from './api/device/device.service';
import { SessionService } from './api/session/session.service';
import { LikeStatusService } from './api/likeStatus/likeStatus.service';*/

import {
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  RegistrationConfirmationUseCase,
  RegistrationEmailResendingUseCase,
  PasswordRecoveryUseCase,
  NewPasswordUseCase,
} from './api/auth/use-cases';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  BanUserUseCase,
} from './api/user/use-cases';
/*import {
  CreateBlogUseCase,
  UpdateBlogUseCase,
  DeleteBlogUseCase,
  BindWithUserBlogUseCase,
  BanBlogUseCase,
  BanUserForBlogUseCase,
} from './api/blog/use-cases';
import {
  CreatePostUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
} from './api/post/use-cases';
import {
  CreateCommentUseCase,
  UpdateCommentUseCase,
  DeleteCommentUseCase,
} from './api/comment/use-cases';*/
import {
  DeleteSqlAllDevicesUseCase,
  DeleteSqlDeviceByIdUseCase,
} from './api/device/use-cases';
/*import {
  CreateSessionUseCase,
  IncreaseAttemptSessionUseCase,
  ResetAttemptSessionUseCase,
} from './api/session/use-cases';
import {
  UpdateLikeStatusCommentUseCase,
  UpdateLikeStatusPostUseCase,
} from './api/likeStatus/use-cases';*/

import { UserRepository } from './api/user/user.repository';
/*import { BlogRepository } from './api/blog/blog.repository';
import { PostRepository } from './api/post/post.repository';
import { CommentRepository } from './api/comment/comment.repository';*/
import { DeviceSqlRepository } from './api/device/device.sql.repository';
/*import { SessionRepository } from './api/session/session.repository';
import { LikeStatusRepository } from './api/likeStatus/likeStatus.repository';
import { BanRepository } from './api/ban/ban.repository';*/

import { UserQueryRepository } from './api/user/user.query.repository';
/*import { BlogQueryRepository } from './api/blog/blog.query.repository';
import { PostQueryRepository } from './api/post/post.query.repository';
import { CommentQueryRepository } from './api/comment/comment.query.repository';*/
import { DeviceSqlQueryRepository } from './api/device/device.sql.query.repository';
import { AuthQueryRepository } from './api/auth/auth.query.repository';
// import { BanQueryRepository } from './api/ban/ban.query.repository';*/

import { EmailAdapter } from './adapters';
import { EmailManager } from './managers';
// import { IsBlogExistConstraint } from './api/blog/custom-validators/customValidateBlog';

const authProviders = [
  AuthService,
  AuthQueryRepository,
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  RegistrationConfirmationUseCase,
  RegistrationEmailResendingUseCase,
  PasswordRecoveryUseCase,
  NewPasswordUseCase,
];
const userProviders = [
  // UserService,
  UserRepository,
  UserQueryRepository,
  CreateUserUseCase,
  DeleteUserUseCase,
  BanUserUseCase,
];
/*const blogProviders = [
  IsBlogExistConstraint,
  BlogService,
  BlogRepository,
  BlogQueryRepository,
  CreateBlogUseCase,
  UpdateBlogUseCase,
  DeleteBlogUseCase,
  BindWithUserBlogUseCase,
  BanBlogUseCase,
  BanUserForBlogUseCase,
];
const postProviders = [
  PostService,
  PostRepository,
  PostQueryRepository,
  CreatePostUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
];
const commentProviders = [
  CommentService,
  CommentRepository,
  CommentQueryRepository,
  CreateCommentUseCase,
  UpdateCommentUseCase,
  DeleteCommentUseCase,
];*/
const deviceProviders = [
  // DeviceService,
  DeviceSqlRepository,
  DeviceSqlQueryRepository,
  DeleteSqlAllDevicesUseCase,
  DeleteSqlDeviceByIdUseCase,
];
/*const sessionSProviders = [
  SessionService,
  SessionRepository,
  CreateSessionUseCase,
  IncreaseAttemptSessionUseCase,
  ResetAttemptSessionUseCase,
];
const likeStatusSProviders = [
  LikeStatusService,
  LikeStatusRepository,
  UpdateLikeStatusCommentUseCase,
  UpdateLikeStatusPostUseCase,
];
const banSProviders = [BanRepository, BanQueryRepository];*/

const adapters = [EmailManager, EmailAdapter];

@Module({
  imports: [
    ConfigModule.forRoot(),
    /*MongooseModule.forRoot(
      process.env.MONGO_ATLAS_URI || 'mongodb://127.0.0.1/bloggers',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    MongooseModule.forFeature([
      { name: LikeStatus.name, schema: LikeStatusSchema },
    ]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'kandula.db.elephantsql.com',
      port: 5432,
      username: 'lmxvapgr',
      password: 's22x3YZbf6AiJISG1ehaj7k4TFs1h-Ih',
      database: 'lmxvapgr',
      autoLoadEntities: false,
      synchronize: false,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'a.marcuk2023@gmail.com',
          pass: 'suflbzalydymjqnt',
        },
      },
      defaults: {
        from: '"nestjs-mongoose-api-ya" <a.marcuk2023@gmail.com>',
      },
    }),
    CqrsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    /*BlogController,
    BloggerController,
    SABlogController,
    PostController,
    CommentController,*/
    DeviceSqlController,
    TestingController,
  ],
  providers: [
    AppService,
    ...authProviders,
    ...userProviders,
    /*...blogProviders,
    ...postProviders,
    ...commentProviders,*/
    ...deviceProviders,
    /*...sessionSProviders,
    ...likeStatusSProviders,
    ...banSProviders,*/
    ...adapters,
  ],
  /*exports: [
    BlogService,
    BlogRepository,
    BlogQueryRepository,

    PostService,
    PostRepository,
    PostQueryRepository,

    CommentService,
    CommentRepository,
    CommentQueryRepository,

    DeviceService,
    DeviceRepository,
    DeviceQueryRepository,

    SessionService,
    SessionRepository,

    LikeStatusService,
    LikeStatusRepository,
  ],*/
})
export class AppModule {}