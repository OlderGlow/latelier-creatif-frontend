import { Component, OnInit } from '@angular/core';
import { Creations } from 'src/app/models/creations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tricot',
  templateUrl: './tricot.component.html',
  styleUrls: ['./tricot.component.scss']
})
export class TricotComponent implements OnInit {

  cp: any;
  total: any;
  ipp = 6;
  creations: Creations;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void{
    this.as.getCreationsByCategory('tricot').subscribe(data => {
      this.creations = data.filter((item: { published: any; }) => (item.published));    });
  }

  handlePageChange(event: any): void {
    this.cp = event;
  }

}
