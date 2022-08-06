import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../../../shared/models/beers.interface';

@Component({
  selector: 'app-beers-item',
  templateUrl: './beers-item.component.html',
  styleUrls: ['./beers-item.component.scss']
})
export class BeersItemComponent implements OnInit {
    @Input() beer!: Beer;

  constructor() { }

  ngOnInit(): void {
  }

}
