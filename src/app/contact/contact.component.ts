import { Mail } from '../models/mail';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { fadeInAnimation } from '../_animations/fadein';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  nameTitle = 'L\'Atelier Créatif | Nous Contacter';
  firstName: string;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private apiService: ApiService) { }

  bodyMail: Mail;
  formMail: FormGroup = this.formBuilder.group({
    firstName: '',
    lastName: '',
    content: '',
    email: ''
  });

  ngOnInit(): void {
    this.setTitle(this.nameTitle);
  }

  onClick(): void{
    this.bodyMail = {
      firstName: this.formMail.value.firstName,
      lastName: this.formMail.value.lastName,
      content: this.formMail.value.content,
      email: this.formMail.value.email
    };
    this.sendMail(this.bodyMail);
  }
  public setTitle(t: string): void{
    this.titleService.setTitle(t);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.setTitle('L\'Atelier Créatif');
  }

  // tslint:disable-next-line: no-shadowed-variable
  sendMail(Mail: Mail): void{
    this.apiService.postApi(Mail).subscribe();
  }

}
