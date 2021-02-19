import { Component, OnInit } from '@angular/core';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-expovente',
  templateUrl: './expovente.component.html',
  styleUrls: ['./expovente.component.scss']
})
export class ExpoventeComponent implements OnInit {

  evenements: Evenements;
  constructor(private as: ApiService) { }

  ngOnInit(): void {
    this.as.getEvenementsByCategory('Expo-Vente').subscribe(data => {
      this.evenements = data.filter((item: { published: any; }) => (item.published));
    });
  }
}
