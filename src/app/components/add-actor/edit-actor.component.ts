import {Component} from '@angular/core';
import {PickMoviesService} from "../../service/pick-movies.service";
import {Movie} from "../../models/movie.model";
import {ActorService} from "../../service/actor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActorRequest} from "../../models/actor-request";
import {MovieService} from "../../service/movie.service";
import {Actor} from "../../models/actor.model";
import {th} from "@faker-js/faker";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-add-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css'],
  providers: [PickMoviesService]

})
export class EditActorComponent {
  actorId: number | undefined;
  actor!: Actor;
  addActorModel!: ActorRequest;

  constructor(private actorService: ActorService,
              private movieService: MovieService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              public pickMoviesService: PickMoviesService) {
  }

  ngOnInit(): void {
    this.authService.forbidIfNotAdmin()

    this.route.params.subscribe(params => {
      this.actorId = params['id'];
    });
    if (this.actorId !== undefined) {
      console.log("ACCCC")
      console.log(this.actorId)
      this.actorService.getActor(this.actorId)
        .subscribe((actor: Actor) => this.actor = actor)
      this.actorService.getMoviesByActorId(this.actorId)
        .subscribe((movies: Movie[]) => {
            this.pickMoviesService.pickedMovies = movies
          }
        );
    } else {
      this.actor = new Actor()
      this.pickMoviesService.pickedMovies = []
    }
    this.movieService.getMovies()
      .subscribe((allMovies: Movie[]) =>
        this.pickMoviesService.unpickedMovies = allMovies.filter(movie =>
          !this.pickMoviesService.pickedMovies.map(pickedMovie => pickedMovie.id)
            .includes(movie.id)
        )
      );
  }

  save(): void {
    this.addActorModel = {
      name: this.actor.name,
      movieIds: this.pickMoviesService.pickedMovies.map(movie => movie.id)
    }

    if (this.actorId === undefined) {
      this.actorService.addActor(this.addActorModel).subscribe(
        () => {
          console.log('Actor created successfully');
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Error adding actor: ', error);
        }
      );
    } else {
      //todo add call to update actor
      this.actorService.updateActor(this.actor.id, this.addActorModel).subscribe(
        () => {
          console.log('Actor created successfully');
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Error adding actor: ', error);
        }
      );
    }

  }

  remove(movie: Movie): void {
    this.pickMoviesService.pickedMovies = this.pickMoviesService.pickedMovies
      .filter(curMovie => curMovie.id !== movie.id)
    this.pickMoviesService.unpickedMovies.push(movie)
  }
}
