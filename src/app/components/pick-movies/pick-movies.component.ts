// pick-movies.component.ts
import {Component, Input} from '@angular/core';
import {Movie} from "../../models/movie.model";
import {MovieService} from "../../service/movie.service";
import {PickMoviesService} from "../../service/pick-movies.service";

@Component({
  selector: 'app-pick-movies',
  templateUrl: './pick-movies.component.html',
  styleUrls: ['./pick-movies.component.css'],
})
export class PickMoviesComponent {
  constructor(public pickUncategorizedMoviesService: PickMoviesService) {
  }

  pickMovie(movie: Movie): void {
    this.pickUncategorizedMoviesService.unpickedMovies = this.pickUncategorizedMoviesService
      .unpickedMovies
      .filter(curMovie => {
        return curMovie.id !== movie.id
      });

    this.pickUncategorizedMoviesService.pickedMovies.push(movie)
  }
}
