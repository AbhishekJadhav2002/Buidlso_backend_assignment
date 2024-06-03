import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database.module';
import { AuthModule } from './auth/auth.module';
import { MovieRatingModule } from './movie-rating/movie-rating.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    MoviesModule,
    UsersModule,
    MovieRatingModule,
    AuthModule,
  ],
})
export class AppModule {}
