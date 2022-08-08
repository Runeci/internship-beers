import { Component, OnInit } from '@angular/core';
import { BeersFavService } from '../../features/beers/beers-fav.service';
import { Beer } from '../../shared/models/beers.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public favItems: Beer['id'][];

    constructor(private beersFavService: BeersFavService) {
    }

    public ngOnInit(): void {
        this.favItems = this.beersFavService.favItems;
    }
}
