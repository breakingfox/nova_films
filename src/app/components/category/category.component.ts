// category.component.ts
import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../models/movie.model";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../models/category.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // @ts-ignore
  @Input() category: Category;

  categoryMovies: Movie[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getMoviesByCategory(this.category.id).subscribe(
      (data: Movie[]) => {
        this.categoryMovies = data;
      },
      (error) => {
        console.error('Error fetching movies by category:', error);
      }
    );

    //todo get movies for category here
  }

  //todo
  // constructor(private dataService: DataService) {}
  // ngOnInit() {
  //   this.dataService.getMoviesByCategory(this.categoryId).subscribe((movies) => {
  //     this.categoryMovies = movies;
  //   });
  // }


}
