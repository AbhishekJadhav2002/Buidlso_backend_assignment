import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createMovie(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('releaseDate') releaseDate: string,
    @Body('genre') genre: string,
  ) {
    return this.moviesService.createMovie(
      title,
      description,
      genre,
      releaseDate,
    );
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.moviesService.findByGenre(genre);
  }

  @Patch(':id/rate')
  rateMovie(@Param('id') id: number, @Body('rating') rating: number) {
    return this.moviesService.rateMovie(id, rating);
  }
}
