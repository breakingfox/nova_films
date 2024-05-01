import {Component, HostListener, OnInit} from '@angular/core';
import {faker} from '@faker-js/faker';
import {Movie} from "../../models/movie.model";
import {MockDataService} from "../../service/data-mocker.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  // The number of movies to load on each scroll
  moviesToLoad = 10;

  isLoading: boolean = false;

  constructor(private mockDataService: MockDataService) {
    // Load initial data here
    this.loadMoreMovies();

  }

  loadMoreMovies() {
    if (!this.isLoading) {
      this.isLoading = true;
      // Fetch additional movies (e.g., from a service or API) and append them to this.movies.
      // Set isLoading to false when data is loaded.
    }
  }

  // Detect scroll events
  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atEnd = element.scrollLeft + element.clientWidth === element.scrollWidth;

    if (atEnd) {
      this.loadMoreMovies();
    }
  }

  ngOnInit() {
    // this.movies = this.mockDataService.generateMockMovies(40)
  }
}
