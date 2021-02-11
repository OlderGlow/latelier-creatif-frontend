import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modale.service';

@Component({
    selector: 'app-jw-modal',
    templateUrl: 'modals.component.html',
    styleUrls: ['modals.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    @Input() title: string;
    @Input() description: string;
    @Input() imgsrc: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        document.body.appendChild(this.element);

        this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        this.element.style.display = 'block';
        this.element.classList.add('fadeIn');
        document.body.classList.add('jw-modal-open');
    }

    close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('jw-modal-open');
    }
}
