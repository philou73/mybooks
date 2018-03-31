import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

	books: Book[];
	bookSubscription: Subscription;
	
  constructor(private bookService : BookService,
							private router: Router) { }

  ngOnInit() {
		//On souscrit au Subject du service BookService
		this.bookSubscription = this.bookService.bookSubject.subscribe(
			(books: Book[]) => {
				this.books = books;
			}
		);
		//Il ne faut pas oublier de lancer la première émission pour récupérer les livres !!!
		this.bookService.emitBooks();
  }
	
	// On gère la navigation pour la création d'un nouveau livre
	onNewBook() {
		this.router.navigate(['/books', 'new']);
	}
	
	// Pour la suppression d'un livre, on appelle le service de suppression
	onDeleteBook(book: Book) {
		this.bookService.removeBook(book);
	}
	
	// On gère la navigation pour la consultation d'un livre
	onViewBook(id: number){
		this.router.navigate(['/books', 'view', id]);
	}
	
	// On libère l'écoute du Subject du service BookService
	ngOnDestroy () {
		this.bookSubscription.unsubscribe();
	}

}
