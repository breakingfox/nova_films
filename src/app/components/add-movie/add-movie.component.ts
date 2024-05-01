import {Component} from '@angular/core';
import {Movie} from "../../models/movie.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../service/movie.service";
import {FileHandle} from "../../models/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Category} from "../../models/category.model";
import {CategoryService} from "../../service/category.service";
import {AddMovie} from "../../models/add-movie.model";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie!: AddMovie;
  categories!: Category[];
  selectedCategory!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.authService.forbidIfNotAdmin()

    this.movie = new AddMovie(); // Initialize the movie object
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  saveMovie() {
    this.movie.categoryId = this.selectedCategory

    const formData = this.prepareFormDataForMovie(this.movie);
    this.movieService.addMovie(formData).subscribe(
      () => {
        console.log('Movie created successfully');
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
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.movie.thumbnail = fileHandle;
    }
  }

  fileDropped(fileHandle: FileHandle) {
    this.movie.thumbnail = fileHandle;
  }


  prepareFormDataForMovie(movie: AddMovie): FormData {
    const uploadImageData = new FormData();
    uploadImageData.append(
      "movie",
      new Blob([JSON.stringify(movie)], {type: "application/json"})
    );

    uploadImageData.append(
      "imageFile",
      this.movie.thumbnail.file,
      this.movie.thumbnail.file.name
    );
    return uploadImageData;
  }


}
