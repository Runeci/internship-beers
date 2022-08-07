import { Component, OnInit } from '@angular/core';
import { BeersApiService } from '../../beers-api.service';
import { Beer } from '../../../../shared/models/beers.interface';
import { ActivatedRoute } from '@angular/router';
import { BeersService } from '../../beers.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-beers-list',
    templateUrl: './beers-list.component.html',
    styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {
    public beers$: BehaviorSubject<Beer[]>;
    private beersSearchValue = '';

    constructor(
        private beersApiService: BeersApiService,
        private beerService: BeersService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.beers$ = this.beerService.beers$;
    }
}
