import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../models/movie.model";
import {environment} from "../../environments/environment";
import {Category} from "../models/category.model";
import {CategoryRequest} from "../models/category-request.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = `${environment.baseUrl}/categories`

  constructor(private http: HttpClient) {
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${(this.categoryUrl)}/${id}`);
  }

  getCategoryByMovieId(id: number): Observable<Category> {
    return this.http.get<Category>(`${(this.categoryUrl)}/${id}/movie`);
  }

  addCategory(addCategory: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${(this.categoryUrl)}/add`, addCategory);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${(this.categoryUrl)}`);
  }

  getMoviesByCategory(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${(this.categoryUrl)}/movies/${id}`);
  }

  updateCategory(id: number, categoryRequest: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${(this.categoryUrl)}/${id}`, categoryRequest);
  }

  deleteCategory(id: number): void {
    this.http.post(`${(this.categoryUrl)}/delete/${id}`,[]).subscribe(data=>data);
  }

  removeMovieFromCategory(categoryId: number, movieId: number): Observable<Category> {
    return this.http.post<Category>(`${(this.categoryUrl)}/remove/${categoryId}/${movieId}`,
      [categoryId, movieId]);
  }
}

