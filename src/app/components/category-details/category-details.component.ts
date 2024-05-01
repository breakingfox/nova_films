// category-details.component.ts
import { Component, Input } from '@angular/core';
import {Category} from "../../models/category.model";
import {Movie} from "../../models/movie.model";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent {
  @Input() category!: Category;
  @Input() movies!: Movie[];

  constructor(private categoryService: CategoryService) {}

  removeMovieFromCategory(movie: Movie): void {
    this.categoryService.removeMovieFromCategory(this.category.id, movie.id);
  }
}
