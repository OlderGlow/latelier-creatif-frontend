import { Component, OnInit } from '@angular/core';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-expovente',
  templateUrl: './expovente.component.html',
  styleUrls: ['./expovente.component.scss']
})
export class ExpoventeComponent implements OnInit {

  cp: any = 0;
  total: any;
  ipp = 8;
  evenements: Evenements;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.fetchData(this.cp);
  }

  fetchData(id): void{
    this.as.getEvenementsByCategory('Expo-Vente', id, this.ipp).subscribe(data => {
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
