import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router ) { }
	
	// La méthode canActivate renverra une Promise car le service de vérification de l'authentification est asynchrone
	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise (
			(resolve, reject) => {
				firebase.auth().onAuthStateChanged(
					(user) => {
						if (user) {
							// Si une connexion est active, le service renvoie un objet User, on peut alors dire que la connexion est active
							resolve(true);
						} else {
							//On n'a pas de user, il faut se débrancher vers la connexion
							this.router.navigate(['/auth','signin']);
							resolve(false);
						}
					}
				);
			}
		);
		
	}

}
