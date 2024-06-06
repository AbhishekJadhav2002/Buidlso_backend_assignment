import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MovieRatingService } from './movie-rating.service';

@Controller('movie-rating')
export class MovieRatingController {
  constructor(private readonly movieRatingService: MovieRatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':movieId/rate')
  async rateMovie(
    @Param('movieId') _movieId: number,
    @Body('userId') _userId: number,
    @Body('rating') _rating: number,
  ) {
    const {
      user: { id: userId },
      movie: { id: movieId },
      created_at,
      rating,
    } = await this.movieRatingService.rateMovie(_userId, _movieId, _rating);
    return { userId, movieId, created_at, rating };
  }

  @Get(':movieId')
  getRatingsByMovie(@Param('movieId') movieId: number) {
    return this.movieRatingService.getRatingsByMovie(movieId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':movieId/me')
  getRatingByUser(@Request() req, @Param('movieId') movieId: number) {
    return this.movieRatingService.getRatingByUser(req.user.userId, movieId);
  }
}
