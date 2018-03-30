import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class BookService {

	// On crée notre tableau de livres
	books: Book[] = [];
	
	// On s'abonne à la mise à jour des livres
	bookSubject = new Subject<Book[]>();
	
  // Fonction pour prévenir tous les abonnés que les livres ont été mis à jour
	emitBooks() {
		this.bookSubject.next(this.books);
	}
	
	// Fonction de mise à jour des livres
	saveBooks(){
		firebase.database().ref('/books').set(this.books);
	}
	constructor() { }

	// Récupération de tous les livres, avec la méthode .on qui va s'exécuter à chaque fois que la base de données sera modifiée
	getBooks(){
		firebase.database().ref('/books')
			.on('value', (data: DataSnapshot) => {
				this.books = data.val ? data.val() : [];
				this.emitBooks();
			}
		);
	}
	
	// Récupération d'un seul livre, avec une Promise() 
	getSingleBook(id: number){
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/books/'+id).once('value').then(
					(data: DataSnapshot) => {
						resolve(data.val());
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	}
	
	// Création d'un nouveau livre
	createBook(book: Book) {
		this.books.push(book);
		this.saveBooks();
		this.emitBooks();
	}
	
	// Suppression d'un livre
	removeBook(book: Book) {
		const bookIndexToRemove = this.books.findIndex(
			(bookEl) => {
				if(bookEl === book) {
					return true;
				}
			}
		);
		this.books.splice(bookIndexToRemove, 1);
		this.saveBooks();
		this.emitBooks();
	}
}
