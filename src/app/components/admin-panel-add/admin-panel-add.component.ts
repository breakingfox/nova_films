import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Category} from "../../models/category.model";
import {Movie} from "../../models/movie.model";
import {Actor} from "../../models/actor.model";
import {User} from "../../models/user.model";
import {MovieService} from "../../service/movie.service";
import {ActorService} from "../../service/actor.service";
import {UserService} from "../../service/user.service";
import {CategoryService} from "../../service/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel-add',
  templateUrl: './admin-panel-add.component.html',
  styleUrls: ['./admin-panel-add.component.css']
})
export class AdminPanelAddComponent {
  categories!: Category[];
  movies!: Movie[];
  actors!: Actor[];
  users!: User[];

  constructor(private authService: AuthService,
              private categoryService: CategoryService,
              private movieService: MovieService,
              private actorService: ActorService,
              private userService: UserService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.authService.forbidIfNotAdmin()

    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories)

    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies)

    this.actorService.getActors()
      .subscribe(actors => this.actors = actors)

    this.userService.getUsers()
      .subscribe(users => this.users = users)
  }

  editCategory(id: number) {
    this.router.navigate([`/categories/${id}/edit`]);
  }

  editMovie(id: number) {
    this.router.navigate([`/movies/${id}/edit`]);
  }

  editActor(id: number) {
    this.router.navigate([`/actors/${id}/edit`]);
  }

  editUser(id: number | undefined) {
    this.router.navigate([`/users/${id}/edit`]);
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id);
    this.categories = this.categories.filter(category => category.id !== id)
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id);
    this.movies = this.movies.filter(movie => movie.id !== id)

  }

  deleteActor(id: number) {
    this.actorService.deleteActor(id);
    this.actors = this.actors.filter(actor => actor.id !== id)
  }

  deleteUser(id: number | undefined) {
    if (id) {
      this.userService.deleteUser(id);
      this.users = this.users.filter(user => user.id !== id)
    }
  }
}
