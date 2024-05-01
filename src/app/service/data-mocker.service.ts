// mock-data.service.ts
import {Injectable} from '@angular/core';
import {faker} from '@faker-js/faker';
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  // generateMockMovies(numMovies: number): Movie[] {
  //   const mockMovies: Movie[] = [];
  //   for (let i = 0; i < numMovies; i++) {
  //     const movie: Movie = {
  //       id: i + 1,
  //       name: faker.lorem.words(3),
  //       description: faker.lorem.paragraphs(1),
  //       thumbnail: {
  //         file: faker.,
  //         url: this.sanitizer.bypassSecurityTrustUrl(
  //           window.URL.createObjectURL(file)
  //         ),
  //       };,
  //       videoUrl: "",
  //       categoryId: i + 1
  //     };
  //     mockMovies.push(movie);
  //   }
  //   return mockMovies;
  // }
  //
  // getMovieById(id: number): Movie {
  //   return {
  //     id: 1,
  //     name: faker.lorem.words(3),
  //     thumbnail: faker.image.urlLoremFlickr({
  //       category: "nature",
  //       width: 300,
  //       height: 200
  //     }),
  //     description: faker.lorem.paragraphs(1),
  //     videoUrl: "",
  //     categoryId: 1
  //   };
  // }
}
