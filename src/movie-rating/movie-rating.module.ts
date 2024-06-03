import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRatingService } from './movie-rating.service';
import { MovieRatingController } from './movie-rating.controller';
import { MovieRating } from './entities/movie-rating.entity';
import { MoviesModule } from '../movies/movies.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRating]), MoviesModule, UsersModule],
  controllers: [MovieRatingController],
  providers: [MovieRatingService],
})
export class MovieRatingModule {}
