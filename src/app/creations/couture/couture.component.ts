import { map } from 'rxjs/operators';
import {
  ModalService
} from 'src/app/services/modale.service';
import {
  Creations
} from 'src/app/models/creations';
import {
  ApiService
} from 'src/app/services/api.service';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-couture',
  templateUrl: './couture.component.html',
  styleUrls: ['./couture.component.scss']
})
export class CoutureComponent implements OnInit {

  cp: any;
  total: any;
  ipp = 6;
  creations: Creations;
  constructor(private as: ApiService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.fetchData();
    }


  // tslint:disable-next-line: typedef
  fetchData() {
    this.as.getCreationsByCategory('couture').subscribe(data => {
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
