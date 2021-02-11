import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  stateOpen: boolean = false;
  stateAdministration: boolean = false;
  stateCreations: boolean = false;
  stateEvenements: boolean = false;
  isAdmin: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('userInfo')){
      this.isAdmin = true;
    }
  }

  onClick(){
    this.stateOpen = !this.stateOpen;
  }

  onClickAdministrationReponsive(){
    this.stateAdministration = !this.stateAdministration;
  }

  onClickCreationsResponsive(){
    this.stateCreations = !this.stateCreations;
    if(this.stateAdministration){
      return (!this.stateAdministration)

    }
  }

  onClickEvenementsResponsive(){
    this.stateEvenements = !this.stateEvenements;
  }

}
