import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../models/movie.model';
import {MovieService} from "../../service/movie.service";
import {Actor} from "../../models/actor.model";
import {ActorService} from "../../service/actor.service";
import {Image} from "../../models/image.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie!: Movie;
  actors!: Actor[];
  imageUrl!: SafeResourceUrl;
  protected isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private actorService: ActorService,
    private authService: AuthService,
    private _sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      this.loadMovie(movieId)
      this.loadActors(movieId)
      this.isAdmin = this.authService.isAdmin();
    });
  }

  private loadImageFromByteArray(image: Image): void {
    this.imageUrl=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + image.picByte);
  }

  loadMovie(movieId: number) {
    this.movieService.getMovieById(movieId).subscribe(
      (data: Movie) => {
        this.movie = data;
        this.loadImageFromByteArray(this.movie.thumbnail)
      },
      (error) => {
        console.error('Error fetching movies by category:', error);
      }
    );
  }

  loadActors(movieId: number) {
    this.actorService.getActorsByMovieId(movieId).subscribe(
      (data: Actor[]) => {
        this.actors = data;
      },
      (error: any) => {
        console.error('Error loading actors for a movie: ', error);
      }
    );
  }

}
