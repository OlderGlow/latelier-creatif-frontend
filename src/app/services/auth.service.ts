import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'https://latelier-creatif.herokuapp.com/authenticate';

  constructor(private http: HttpClient, private cs: CookieService) { }

  public isAuthenticated(): boolean {
    const userData = this.cs.get('userInfo');
    if (userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public setUserInfo(user){
    this.cs.set('userInfo', JSON.stringify(user));
  }

  public validate(email: String, password: String) {
    try {
    return this.http.post(this.API_URL, {username : email, password}).toPromise();
    } catch (error) {
      console.log('Une erreur côté serveur est survenue');
    }
  }
}
