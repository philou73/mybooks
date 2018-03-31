import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

	bookForm: FormGroup;
	fileIsUploading: boolean = false;
	fileUrl: string;
	fileUploaded: boolean = false;
	
  constructor(private formBuilder: FormBuilder,
							private router: Router,
							private bookService: BookService) { }

  ngOnInit() {
		this.initForm();
  }

	// Fonction de création du formulaire
	initForm(){
		this.bookForm = this.formBuilder.group({
			title: ['', Validators.required],
			author: ['', Validators.required],
			synopsis: ['']
		});
	}
	
	onSaveBook(){
		const title = this.bookForm.value['title'];
		const author = this.bookForm.value['author'];
		const synopsis = this.bookForm.value['synopsis'];
		const newBook = new Book(title, author);
		newBook.synopsis = synopsis;
		if(this.fileUrl && this.fileUrl !==''){
			newBook.photo = this.fileUrl;
		}
		this.bookService.createBook(newBook);
		this.router.navigate(['/books']);
	}
	
	onUploadFile(file: File){
		this.fileIsUploading = true;
		this.bookService.uploadFile(file).then(
			(url: string) => {
				this.fileUrl = url;
				this.fileIsUploading = false;
				this.fileUploaded = true;
			},
			(error) => {
				console.log("Erreur lors de l'upload du fichier : " + error);
			}
		);
	}
	
	// On upload le fichier dès qu'il est sélectionné dans l'input File
	detectFiles(event){
		this.onUploadFile(event.target.files[0]);
	}
}
