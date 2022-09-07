import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SubusersModule } from './subusers/subusers.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wlstjd1!',
      database: 'WEFLIX',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: false, //스키마 바꿀때마다 데이터 초기화됨 배포할때는 true
      autoLoadEntities: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    SubusersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
