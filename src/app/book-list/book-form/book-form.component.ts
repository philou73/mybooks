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
		this.bookService.createBook(newBook);
		this.router.navigate(['/books']);
	}
}
