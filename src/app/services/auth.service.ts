import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

  constructor() { }
	
	//On crée un nouvel utilisateur à l'aide de firebase.auth(), et on retourne une Promise() car c'est en asynchrone
	createNewUser(email: string, password: string) {
		return new Promise(
			(resolve, reject) => {
				firebase.auth().createUserWithEmailAndPassword(email, password).then(
					() => {
						resolve();
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	}
	
	//Pour se connecter, on gère aussi une Promise en appelant la méthode asynchrone de firebase.auth()
	signInUser(email: string, password: string){
		return new Promise(
			(resolve, reject) => {
				firebase.auth().signInWithEmailAndPassword(email, password).then(
					() => {
						resolve();
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	}
	
	// Déconnexion simple, on n'attend pas le retour de firebase.auth(), et on l'applique sur le user connecté uniquement
	signOutUser() {
		firebase.auth().signOut();
	}
}
