import {
  Component,
  OnInit
} from '@angular/core';
import {
  Creations
} from 'src/app/models/creations';
import {
  ApiService
} from 'src/app/services/api.service';
import {
  registerLocaleData
} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.scss']
})
export class CreationsComponent implements OnInit {

  creations: Creations;
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
    this.as.deleteCreation(id).subscribe(() => this.fetchData());
  }

  fetchData(): void {
    this.as.getCreations().subscribe(data => {
      console.log(data);
      this.creations = data;
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
