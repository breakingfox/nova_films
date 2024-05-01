import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from "../../service/movie.service";
import {Movie} from "../../models/movie.model";
import {ActorService} from "../../service/actor.service";
import {Actor} from "../../models/actor.model";
import {AuthService} from "../../service/auth.service";
import {FileHandle} from "../../models/file-handle.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Category} from "../../models/category.model";
import {CategoryService} from "../../service/category.service";
import {Image} from "../../models/image.model";
import {PickActorsService} from "../../service/pick-actors.service";
import {MovieUpdate} from "../../models/update-movie.model";


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
  providers: [PickActorsService]
})
export class MovieEditComponent implements OnInit {
  movieId!: number;
  movie!: Movie;
  actors!: Actor[];
  categories!: Category[];
  imageUrl!: SafeResourceUrl;
  newThumbnail!: FileHandle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService,
    private actorService: ActorService,
    private categoryService: CategoryService,
    public pickActorsService: PickActorsService,
    private _sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.authService.forbidIfNotAdmin()

    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log(this.categories);

        this.route.params.subscribe(params => {
          this.movieId = +params['id'];
          console.log(this.movieId)
          this.loadMovie();

          this.loadActors();
        });
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );


  }

  loadMovie() {
    this.movieService.getMovieById(this.movieId).subscribe(
      (data: Movie) => {
        this.movie = data;
        console.log(this.movie)
        this.loadCategory();
        this.loadImageFromByteArray(this.movie.thumbnail);
      },
      (error: any) => {
        console.error('Error loading movie: ', error);
      }
    );
  }

  loadCategory() {
    this.categoryService.getCategoryByMovieId(this.movie.id).subscribe(
      (data: Category) => {
        this.movie.categoryId = data.id;
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }

  updateMovie() {
    // this.movie.categoryId = this.selectedCategory.id
    //
    // //todo add image update
    // //todo do we need to update actor list?
    // this.movieService.updateMovie(this.movie).subscribe(
    //   () => {
    //     console.log('Movie updated successfully');
    //     this.router.navigate(['/movies']);
    //   },
    //   (error: any) => {
    //     console.error('Error updating movie: ', error);
    //   }
    // );
  }

  loadActors() {

    this.actorService.getActorsByMovieId(this.movieId).subscribe(
      (data: Actor[]) => {
        this.pickActorsService.pickedActors = data;
      },
      (error: any) => {
        console.error('Error loading actors for a movie: ', error);
      }
    );

    this.actorService.getActors()
      .subscribe((allActors: Actor[]) =>
        this.pickActorsService.unpickedActors = allActors.filter(actor =>
          !this.pickActorsService.pickedActors.map(pickedActor => pickedActor.id)
            .includes(actor.id)
        )
      );
  }

  remove(actor: Actor): void {
    this.pickActorsService.pickedActors = this.pickActorsService.pickedActors
      .filter(curActor => curActor.id !== actor.id)
    this.pickActorsService.unpickedActors.push(actor)
  }

  // addActor() {
  //   // Implement logic to add actor to the movie
  //   if (this.newActorName.trim() !== '') {
  //     const newActor: Actor = { id: 0, name: this.newActorName };
  //     this.movie.actors.push(newActor);
  //     this.newActorName = ''; // Clear the input field
  //   }
  // }
  //
  categoryValue: any;
  removeActor(actor: Actor) {
    //todo implement
    //   // Implement logic to remove actor from the movie
    //   this.movie.actors = this.movie.actors.filter((a) => a.id !== actor.id);
  }

  private loadImageFromByteArray(image: Image): void {
    this.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + image.picByte);
  }

  selectOption(id: EventTarget | null) {
    //getted from event
    console.log(id);
    //getted from binding
  }
  save() {
    var movieUpdate = new MovieUpdate(this.movie, this.pickActorsService.pickedActors.map(actor => actor.id));
    const formData = this.prepareFormDataForMovie(movieUpdate, this.newThumbnail);

    this.movieService.updateMovie(movieUpdate.id, formData).subscribe(
      () => {
        console.log('Movie updated successfully');
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error adding movie: ', error);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this._sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.newThumbnail = fileHandle;
    }
  }

  prepareFormDataForMovie(movie: MovieUpdate, newThumbnail: FileHandle): FormData {
    const uploadImageData = new FormData();
    uploadImageData.append(
      "movie",
      new Blob([JSON.stringify(movie)], {type: "application/json"})
    );
    if (newThumbnail!==undefined&& newThumbnail.file !== undefined) {
      uploadImageData.append(
        "imageFile",
        newThumbnail.file,
        newThumbnail.file.name
      );
    }

    return uploadImageData;
  }
}
