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
  isLoading = true;

  constructor(private as: ApiService) {}

  ngOnInit(): void {
    this.fetchData(0, this.ipp);
  }

  deleteCreation(id: string): void {
    this.as.deleteCreation(id).subscribe(() => this.fetchData(this.cp, this.ipp));
  }

  fetchData(id: number, ipp: number): void {
    this.as.getCreations(id, this.ipp).subscribe(data => {
      this.creations = data.items;
      this.total = data.totalItems;
      this.isLoading = false;
    });
  }

  handlePageChange(event: any): void {
    this.creations = null;
    this.isLoading = true;
    this.fetchData(event - 1, this.ipp);
    this.cp = event;
  }

  handlePageSizeChange(event: any): void {
    this.ipp = event.target.value;
    this.cp = 1;
  }
}
