import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Imports des services
import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { AuthGuardService } from './services/auth-guard.service';
// Imports des classes 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { HeaderComponent } from './header/header.component';

// Création des routes avant le décorateur
const appRoutes: Routes = [
	{path:'auth/signin', component:SigninComponent},
	{path:'auth/signup', component:SignupComponent},
	{path:'books', canActivate: [AuthGuardService], component: BookListComponent},
	{path:'books/new', canActivate: [AuthGuardService], component: BookFormComponent},
	{path:'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent},
	{path:'', redirectTo: 'books', pathMatch:'full'},
	{path:'**', redirectTo: 'books'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    BookFormComponent,
    SingleBookComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, 
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthService, BookService, AuthGuardService],
  bootstrap: [AppComponent]
})

export class AppModule { 
}
