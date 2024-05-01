// movie.service.ts
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieUrl = `${environment.baseUrl}/movies`

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.movieUrl}`);
  }
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieUrl}/${id}`);
  }

  getMoviesWithoutCategory(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.movieUrl}/uncategorized`);
  }
  addMovie(movie: FormData): Observable<Movie> {
    return this.http.post<Movie>(`${this.movieUrl}/add`, movie);
  }
  addImage(movie: FormData): Observable<string> {
    return this.http.post<string>(`${this.movieUrl}/add/image`, movie);
  }

  updateMovie(id:number, movie: FormData): Observable<Movie> {
    return this.http.post<Movie>(`${this.movieUrl}/${id}`, movie);
  }
  deleteMovie(id: number): void {
    this.http.post(`${(this.movieUrl)}/delete/${id}`,[]).subscribe(data=>data);
  }
}
