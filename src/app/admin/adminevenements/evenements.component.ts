import { Component, OnInit } from '@angular/core';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class AdminEvenementsComponent implements OnInit {

  evenements: Evenements;
  objectKeys = Object.keys;
  id: number;
  ipp = 6;
  cp: any;
  total: any;

  constructor(private as: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  deleteCreation(id: string): void {
    this.as.deleteEvenement(id).subscribe(() => this.fetchData());
  }

  fetchData(): void {
    this.as.getEvenements().subscribe(data => {
      this.evenements = data;
      console.log(this.evenements);
    });
  }

  handlePageChange(event: any): void {
    this.cp = event;
  }

  handlePageSizeChange(event: any): void {
    this.ipp = event.target.value;
    this.cp = 1;
  }

}
