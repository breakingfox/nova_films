import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ActorListComponent} from './components/actor-list/actor-list.component';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MovieCardComponent} from './components/movie-card/movie-card.component';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {HeaderComponent} from './components/header/header.component';
import {CategoryListComponent} from './components/categories-list/categories-list.component';
import {CategoryComponent} from './components/category/category.component';
import {MovieComponent} from './components/movie/movie.component';
import {MovieEditComponent} from './components/movie-edit/movie-edit.component';
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddMovieComponent} from './components/add-movie/add-movie.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {EditCategoryComponent} from './components/add-category/edit-category.component';
import {CategoryDetailsComponent} from './components/category-details/category-details.component';
import {PickMoviesComponent} from './components/pick-movies/pick-movies.component';
import {AdminPanelAddComponent} from './components/admin-panel-add/admin-panel-add.component';
import {EditActorComponent} from './components/add-actor/edit-actor.component';
import {AuthInterceptor} from "./components/auth/auth.interceptor";
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import { AccountComponent } from './components/account/account.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { PickActorsComponent } from './components/pick-actors/pick-actors.component';

const routes: Routes = [
  {path: 'home', component: CategoryListComponent},
  {path: 'actors', component: ActorListComponent},
  {path: 'movies/:id', component: MovieComponent},
  {path: 'movie/add', component: AddMovieComponent},
  {path: 'category/add', component: EditCategoryComponent},
  {path: 'actor/add', component: EditActorComponent},
  {path: 'movies/:id/edit', component: MovieEditComponent},
  {path: 'actors/:id/edit', component: EditActorComponent},
  {path: 'categories/:id/edit', component: EditCategoryComponent},
  {path: 'users/:id/edit', component: UserEditComponent},
  {path: 'admin', component: AdminPanelAddComponent},
  {path: 'account', component: AccountComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ActorListComponent,
    MovieCardComponent,
    MovieListComponent,
    HeaderComponent,
    CategoryListComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    MovieComponent,
    MovieEditComponent,
    AddMovieComponent,
    EditCategoryComponent,
    CategoryDetailsComponent,
    PickMoviesComponent,
    AdminPanelAddComponent,
    EditActorComponent,
    ForbiddenComponent,
    AccountComponent,
    UserEditComponent,
    PickActorsComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

