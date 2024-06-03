import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from '../movies/movies.service';
import { UsersService } from '../users/users.service';
import { MovieRating } from './entities/movie-rating.entity';

@Injectable()
export class MovieRatingService {
  constructor(
    @InjectRepository(MovieRating)
    private movieRatingRepository: Repository<MovieRating>,
    private usersService: UsersService,
    private moviesService: MoviesService,
  ) {}

  async rateMovie(
    userId: number,
    movieId: number,
    rating: number,
  ): Promise<MovieRating> {
    const user = await this.usersService.findOneById(userId);
    const movie = await this.moviesService.findOne(movieId);
    const existingRating = await this.movieRatingRepository.findOne({
      where: { user, movie },
    });
    if (existingRating) {
      existingRating.rating = rating;
      return {
        movie,
        user,
        ...(await this.movieRatingRepository.save(existingRating)),
      };
    }
    const movieRating = new MovieRating();
    movieRating.user = user;
    movieRating.movie = movie;
    movieRating.rating = rating;
    return this.movieRatingRepository.save(movieRating);
  }

  async getRatingsByMovie(movieId: number): Promise<MovieRating[]> {
    return this.movieRatingRepository.find({
      where: { movie: { id: movieId } },
    });
  }
}
