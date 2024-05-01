// add-category.component.ts
import {Component, Input} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Movie} from "../../models/movie.model";
import {CategoryRequest} from "../../models/category-request.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PickMoviesService} from "../../service/pick-movies.service";
import {MovieService} from "../../service/movie.service";
import {AuthService} from "../../service/auth.service";
import {Category} from "../../models/category.model";

@Component({
  selector: 'app-add-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [PickMoviesService]
})
export class EditCategoryComponent {
  @Input() categoryId: number = -1;

  category!: Category;
  categoryRequest!: CategoryRequest;

  constructor(private categoryService: CategoryService,
              private movieService: MovieService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              public pickMoviesService: PickMoviesService) {
  }

  ngOnInit(): void {
    this.authService.forbidIfNotAdmin()

    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });

    this.movieService.getMoviesWithoutCategory()
      .subscribe((moviesWithoutCategory: Movie[]) => {
        console.log(moviesWithoutCategory)

        this.pickMoviesService.unpickedMovies = moviesWithoutCategory;

        console.log(this.pickMoviesService.unpickedMovies)

        // if it is edit mode
        if (this.categoryId !== undefined && this.categoryId !== -1) {
          this.categoryService.getCategoryById(this.categoryId)
            .subscribe(category => this.category = category)
          this.categoryService.getMoviesByCategory(this.categoryId).subscribe(
            (movies: Movie[]) => {
              this.pickMoviesService.pickedMovies = movies
            }
          );
        } else {
          this.pickMoviesService.pickedMovies = []
        }
      });

    console.log(this.categoryId)
  }

  saveCategory(): void {
    this.categoryRequest = {
      categoryName: this.category.name,
      movieIds: this.pickMoviesService.pickedMovies.map(movie => movie.id)
    }

    if (this.categoryId === -1) {
      this.categoryService.addCategory(this.categoryRequest).subscribe(
        () => {
          console.log('Category created successfully');
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Error adding category: ', error);
        }
      );
    } else {
      //todo check update category
      this.categoryService.updateCategory(this.categoryId, this.categoryRequest).subscribe(
        () => {
          console.log('Category updated successfully');
          this.router.navigate(['/admin']);
        },
        (error: any) => {
          console.error('Error adding category: ', error);
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
