import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

	book: Book;
	
  constructor(private bookService: BookService,
							private route: ActivatedRoute,
							private router: Router) {}
						
  ngOnInit() {
		this.book = new Book("", "");
		const id = this.route.snapshot.params['id']; // On récupère l'id passé en paramètre via ActivatedRoute
		console.log("id passé en paramètre : " + id);
		this.bookService.getSingleBook(+id).then( //+id pour passer la string en number - Promise => .then()
			(book: Book) => {
				this.book = book;
			}
		);
  }

	onBack(){
		this.router.navigate(['/books']);
	}
}
