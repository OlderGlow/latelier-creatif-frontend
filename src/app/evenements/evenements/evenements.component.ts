import { Component, OnInit } from '@angular/core';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit {

  cp: any = 0;
  total: any;
  ipp = 8;
  evenements: Evenements;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.fetchData(this.cp);
  }

  fetchData(id): void{
    this.as.getEvenementsByCategory('Animation', id, this.ipp).subscribe(data => {
      this.evenements = data.items.filter((item: { published: any; }) => (item.published));
      this.total = data.totalItems;
    });
  }

  handlePageChange(event: any): void {
    this.evenements = null;
    this.fetchData(event - 1);
    this.cp = event;
    window.scrollTo(0,0);
  }
}
