import { Component, OnInit } from '@angular/core';
import { Creations } from 'src/app/models/creations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-deconoel',
  templateUrl: './deconoel.component.html',
  styleUrls: ['./deconoel.component.scss']
})
export class DeconoelComponent implements OnInit {

  cp: any;
  total: any;
  ipp = 8;
  creations: Creations;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void{
    this.as.getCreationsByCategory('Décoration de Noël').subscribe(data => {
      this.creations = data.filter((item: { published: any; }) => (item.published));    });
  }

  handlePageChange(event: any): void {
    this.cp = event;
  }
}
