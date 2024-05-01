import {Component, Input} from '@angular/core';
import {Movie} from "../../models/movie.model";
import {Router} from "@angular/router";
import {Image} from "../../models/image.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie: Movie | undefined; // Define the movie object as an Input property
  imageUrl!: SafeResourceUrl; // Add imageUrl property to store the base64 image URL


  constructor(private router: Router,
              private _sanitizer: DomSanitizer) {
  }

  ngOnChanges(): void {
    // Whenever the 'movie' input changes, update the imageUrl

    if (this.movie && this.movie.thumbnail && this.movie.thumbnail.picByte) {
      this.loadImageFromByteArray(this.movie.thumbnail);
    }
  }

  private loadImageFromByteArray(image: Image): void {
    this.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + image.picByte);
  }

  navigateToMovie(movieId: number | undefined): void {
    if (movieId) {
      this.router.navigate(['/movies', movieId]);
    }
  }
}
