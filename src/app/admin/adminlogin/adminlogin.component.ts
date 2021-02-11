import { InterceptorService } from './../../services/interceptor.service';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from 'src/app/services/auth.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})


export class AdminloginComponent implements OnInit {

  username: String;
  password: String;
  hasProblem = false;
  serverDown = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private cs: CookieService, private interceptor: InterceptorService) {}

  formLogin: FormGroup = this.formBuilder.group({
    username: '',
    password: ''
  });


  ngOnInit() {
    if (this.cs.get('userInfo')) {
      this.router.navigate(['admin/home']);
    }
  }

  login() {
    this.username = this.formLogin.value.username;
    this.password = this.formLogin.value.password;
    this.authService.validate(this.username, this.password)
      .then((response) => {
        this.authService.setUserInfo({
          user: 'id'
        });
        this.router.navigate(['admin/home']);
      })
      .catch(err => {
          if (err.status == 0) {
            console.log('Une erreur côté serveur est survenue');
            return this.serverDown = true;
          }
          else if (err.status == 400){
            console.log('Identifiant/mot de passe incorrect');
            return this.hasProblem = true;
            }
          });
        }





}
