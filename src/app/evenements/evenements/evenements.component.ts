import { Component, OnInit } from '@angular/core';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {

  evenements: Evenements;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.as.getEvenementsByCategory('Animation').subscribe(data => {
      this.evenements = data.filter((item: { published: any; }) => (item.published));
    });
  }
}
