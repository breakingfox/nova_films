import {Injectable} from "@angular/core";
import {Movie} from "../models/movie.model";
import {Observable} from "rxjs";

@Injectable()
export class PickMoviesService {
  unpickedMovies!: Movie[];
  pickedMovies: Movie[] = [];
}
