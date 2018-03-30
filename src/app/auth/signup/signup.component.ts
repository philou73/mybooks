import { Component, OnInit } from '@angular/core';
// On importe les services et les classes nécessaires au component
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm : FormGroup;
	errorMessage: string;
	
  constructor(private authService: AuthService,
							private formBuilder: FormBuilder,
							private router: Router) { 
		
	}

  ngOnInit() {
		this.initForm();
  }

	//fonction d'initialisation du formulaire : 2 champs, en méthode Réactive
	initForm(){
		this.signupForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
		});
	}
	
	onSubmit() {
		const email = this.signupForm.value['email'];
		const password = this.signupForm.value['password'];
		
		//On appelle le service de création d'un nouvel utilisateur, qui renvoie une Promise !
		this.authService.createNewUser(email, password).then (
			() => {
				this.router.navigate(['/books']);
			},
			(error) => {
				this.errorMessage = error;
			}
		);
	}
}
