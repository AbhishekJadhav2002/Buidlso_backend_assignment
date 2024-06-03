import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  createMovie(
    title: string,
    description: string,
    genre: string,
    releaseDate: string,
  ): Promise<Movie> {
    const movie = this.moviesRepository.create({
      title,
      description,
      genre,
      releaseDate,
    });
    return this.moviesRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findByGenre(genre: string): Promise<Movie[]> {
    return this.moviesRepository.find({ where: { genre } });
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  async rateMovie(id: number, rating: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (movie) {
      movie.rating = rating;
      return this.moviesRepository.save(movie);
    }
    return null;
  }
}
