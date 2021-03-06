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
	constructor() {
		//Il faut appeler une première fois la méthode getBooks pour déclencher l'écoute de FireBase
		this.getBooks();
	}

	// Récupération de tous les livres, avec la méthode .on qui va s'exécuter à chaque fois que la base de données sera modifiée
	getBooks(){
		console.log("On est dans BookService.getBooks()");
		firebase.database().ref('/books')
			.on('value', (data: DataSnapshot) => {
				this.books = data.val ? data.val() : [];
				this.emitBooks();
				console.log("On vient de récupérer la liste");
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
		// On traite l'existence d'une photo, qu'il faut supprimer
		if(book.photo){
			const storageRef = firebase.storage().refFromURL(book.photo);
			storageRef.delete().then(
				() => {
					console.log("Photo removed : " + book.photo);
				},
				(error) => {
					console.log("Erreur lors de la suppresion de " + book.photo + " : " + error);
				}
			);
		}
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
	
	// Upload d'une image à partir d'un fichier
	uploadFile (file: File) {
		return new Promise(
			(resolve, reject) => {
				const almostUniqueFileName = Date.now().toString(); //On crée un identifiant "unique" basé sur l'heure en millisecondes
				const upload = firebase.storage().ref()
					.child('images/' + almostUniqueFileName + file.name).put(file); //On définit la cible de l'upload et on déclenche
				// Désormais, on écoute le changement d'état de l'upload
				upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
					() => {
						console.log('Chargement...');
					},
					(error) => {
						console.log('Erreur pendant le chargement : ' + error);
					},
					() => {
						resolve(upload.snapshot.downloadURL); // On récupére l'URL de l'image
					}
				);
			}
		);
	}
}	
