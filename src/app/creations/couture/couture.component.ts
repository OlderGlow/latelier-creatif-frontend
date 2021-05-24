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

  cp: any = 0;
  total: any;
  ipp = 8;
  creations: Creations;
  constructor(private as: ApiService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.fetchData(this.cp);
  }

  fetchData(id): void{
    this.as.getCreationsByCategory('couture', id, this.ipp).subscribe(data => {
      this.creations = data.items.filter((item: { published: any; }) => (item.published));
      this.total = data.totalItems;
    });
  }

  handlePageChange(event: any): void {
    this.creations = null;
    this.fetchData(event - 1);
    this.cp = event;
    window.scrollTo(0,0);
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }
}
