import { Component, OnInit } from '@angular/core';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  evenements: Evenements;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.as.getEvenementsByCategory('Opérations').subscribe(data => {
      this.evenements = data.filter((item: { published: any; }) => (item.published));
    });
  }
}
