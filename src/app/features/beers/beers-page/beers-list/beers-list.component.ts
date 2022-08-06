import { Component, OnInit } from '@angular/core';
import { BeersApiService } from '../../beers-api.service';
import { Beer } from '../../../../shared/models/beers.interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-beers-list',
    templateUrl: './beers-list.component.html',
    styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {
    public beers$!: Observable<Beer[]>;

    constructor(
        private beersApiService: BeersApiService
    ) {
    }

    public ngOnInit(): void {
        this.beers$ = this.beersApiService.getBeers();
    }

}
