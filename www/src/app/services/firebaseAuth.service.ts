import { Injectable } from '@angular/core';
import { FirebaseAuth } from 'angularfire2/index';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FirebaseAuthService {

private user:firebase.User;

  constructor(private auth: FirebaseAuth) {
       this.auth.subscribe(auth =>{
        if(!auth){
            this.user = null;
            return;
        }

        this.user = auth.auth;
      });
 
   }

  login(email:string, password:string) {
    return this.auth.login({email,password});
  }

  logout() {
    this.auth.logout();
  }    

  isAuthenticated(): Observable<any> {
      return this.auth;
  } 

  getUser(): firebase.User{
      return this.user;
  }
}