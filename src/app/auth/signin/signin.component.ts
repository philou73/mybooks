import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	signinForm : FormGroup;
	errorMessage : string;
  constructor(private router: Router,
							private formBuilder: FormBuilder,
							private authService: AuthService) { }

  ngOnInit() {
		this.initForm();
  }

	// Fonction d'initialisation du formulaire. Contrairement à la création d'utilisateur, on ne contrôle pas la taille du mot de passe
	initForm(){
		this.signinForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}
	
	onSubmit(){
		const email = this.signinForm.value['email'];
		const password = this.signinForm.value['password'];
		this.authService.signInUser(email, password).then ( //C'est une Promise !
			() => {	// Si pas d'erreur renvoyée par la Promise(), on se débranche vers la liste des livres
				this.router.navigate(['/books']);
			},
			(error) => { // Une erreur a été renvoyée par la Promise()
				this.errorMessage = error;
			}
		);
	}
}
