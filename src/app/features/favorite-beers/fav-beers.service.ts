import { Injectable } from '@angular/core';
import { Beer } from '../../shared/models/beers.interface';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class FavBeersService {
    public favItems: Beer[] = [];
    public favItemsIDs: Beer['id'][] = [];

    constructor(private lsService: LocalStorageService) {
        this.favItems = this.lsService.getFromLocalStorage('fav') || [];
        this.favItemsIDs = this.lsService.getFromLocalStorage('fav')?.map((i: Beer) => i.id) || [];
    }

    public addToFav(favBeer: Beer): void {
        this.favItems.push(favBeer);
        this.favItemsIDs.push(favBeer.id);
        this.lsService.saveToLocalStorage('fav', this.favItems);
    }

    public removeFromFav(favBeerIndex: number) {
        this.favItems.splice(favBeerIndex, 1);
        this.favItemsIDs.splice(favBeerIndex, 1);
        this.lsService.saveToLocalStorage('fav', this.favItems);
    }
}
