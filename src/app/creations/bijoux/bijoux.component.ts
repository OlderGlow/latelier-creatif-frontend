import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Creations } from 'src/app/models/creations';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modale.service';

@Component({
  selector: 'app-bijoux',
  templateUrl: './bijoux.component.html',
  styleUrls: ['./bijoux.component.scss']
})
export class BijouxComponent implements OnInit {

  cp: any = 0;
  total: any;
  ipp = 8;
  creations: Creations;
  constructor(private as: ApiService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.fetchData(this.cp);
  }

  fetchData(id): void{
    this.as.getCreationsByCategory('bijoux', id, this.ipp).subscribe(data => {
      this.creations = data.items.filter((item: { published: any; }) => (item.published));
      this.total = data.totalItems;
    });
  }

  handlePageChange(event: any): void {
    this.creations = null;
    this.fetchData(event - 1);
    this.cp = event;
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

}
