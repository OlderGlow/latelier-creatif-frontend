import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  stateOpen = false;
  stateAdministration = false;
  stateCreations = false;
  stateEvenements = false;
  isAdmin = false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.isAdmin = true;
    }
  }

  // tslint:disable-next-line: typedef
  onClick(){
    this.stateOpen = !this.stateOpen;
  }

  // tslint:disable-next-line: typedef
  onClickAdministrationReponsive(){
    this.stateAdministration = !this.stateAdministration;
  }

  // tslint:disable-next-line: typedef
  onClickCreationsResponsive(){
    this.stateCreations = !this.stateCreations;
    if(this.stateAdministration){
      return (!this.stateAdministration)

    }
  }

  // tslint:disable-next-line: typedef
  onClickEvenementsResponsive(){
    this.stateEvenements = !this.stateEvenements;
  }

}
