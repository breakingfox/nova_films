import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Actor} from "../models/actor.model";
import {ActorRequest} from "../models/actor-request";
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root',
})
export class ActorService {

  private actorsUrl = `${environment.baseUrl}/actors`

  constructor(private http: HttpClient) {
  }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${(this.actorsUrl)}`);
  }

  getActor(actorId: number): Observable<Actor> {
    return this.http.get<Actor>(`${(this.actorsUrl)}/${actorId}`);
  }

  addActor(request: ActorRequest): Observable<Actor> {
    return this.http.post<Actor>(`${(this.actorsUrl)}/add`, request);
  }

  updateActor(id: number, request: ActorRequest): Observable<Actor> {
    return this.http.post<Actor>(`${(this.actorsUrl)}/${id}`, request);
  }

  getActorsByMovieId(movieId: number): Observable<Actor[]> {
    console.log(`${this.actorsUrl}/movie/${movieId}`)
    return this.http.get<Actor[]>(`${this.actorsUrl}/movie/${movieId}`);
  }

  getMoviesByActorId(actorId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.actorsUrl}/${actorId}/movies`);
  }
  deleteActor(id: number): void {
    this.http.post(`${(this.actorsUrl)}/delete/${id}`,[]).subscribe(data=>data);
  }
}
