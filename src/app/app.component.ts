import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(){
		const config = {
			apiKey: "AIzaSyC0Z20yTt4T49RF2Bb0adHmmSU7ojUnBGs",
			authDomain: "pge-library.firebaseapp.com",
			databaseURL: "https://pge-library.firebaseio.com",
			projectId: "pge-library",
			storageBucket: "",
			messagingSenderId: "377027468642"
		};
		firebase.initializeApp(config);
	}
}
