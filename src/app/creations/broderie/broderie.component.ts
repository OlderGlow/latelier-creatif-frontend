import { Component, OnInit } from '@angular/core';
import { Creations } from 'src/app/models/creations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-broderie',
  templateUrl: './broderie.component.html',
  styleUrls: ['./broderie.component.scss']
})
export class BroderieComponent implements OnInit {

  cp: any;
  total: any;
  ipp = 6;
  creations: Creations;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void{
    this.as.getCreationsByCategory('broderie').subscribe(data => {
      this.creations = data.filter((item: { published: any; }) => (item.published));    });
  }

  handlePageChange(event: any): void {
    this.cp = event;
  }
}
