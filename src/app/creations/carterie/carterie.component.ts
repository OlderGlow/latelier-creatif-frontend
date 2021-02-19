import { ModalService } from './../../services/modale.service';
import { Component, OnInit } from '@angular/core';
import { Creations } from 'src/app/models/creations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-carterie',
  templateUrl: './carterie.component.html',
  styleUrls: ['./carterie.component.scss']
})
export class CarterieComponent implements OnInit {

  cp: any;
  total: any;
  ipp = 8;
  creations: Creations;
  constructor(private as: ApiService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void{
    this.as.getCreationsByCategory('carterie').subscribe(data => {
      this.creations = data.filter((item: { published: any; }) => (item.published));
    });
  }

  handlePageChange(event: any): void {
    this.cp = event;
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }
}
