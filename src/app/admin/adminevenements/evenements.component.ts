import { Component, OnInit } from '@angular/core';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modale.service';
@Component({
  selector: 'app-admin-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class AdminEvenementsComponent implements OnInit {

  creations: Evenements;
  objectKeys = Object.keys;
  id: number;
  ipp = 6;
  cp: any;
  total: any;
  isLoading = true;

  constructor(private as: ApiService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.fetchData(0, this.ipp);
  }

  deleteCreation(id: string): void {
    this.as.deleteEvenement(id).subscribe(() => this.fetchData(this.cp, this.ipp));
  }

  fetchData(id: number, ipp: number): void {
    this.as.getEvenements(id, this.ipp).subscribe(data => {
      this.creations = data.items;
      this.total = data.totalItems;
      this.isLoading = false;
    });
  }

  handlePageChange(event: any): void {
    window.scrollTo(0,0);
    this.creations = null;
    this.isLoading = true;
    this.fetchData(event - 1, this.ipp);
    this.cp = event;
  }

  handlePageSizeChange(event: any): void {
    this.ipp = event.target.value;
    this.cp = 1;
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

}
