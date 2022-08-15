import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { BeersPageComponent } from './beers/beers-page/beers-page.component';
import { BeersListComponent } from './beers/beers-page/beers-list/beers-list.component';
import { BeersItemComponent } from './beers/beers-page/beers-item/beers-item.component';
import { FavoriteBeersModalComponent } from './favorite-beers/favorite-beers-modal/favorite-beers-modal.component';
import { BeersItemDetailComponent } from './beers/beers-item-detail/beers-item-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        SearchComponent,
        BeersPageComponent,
        BeersListComponent,
        BeersItemComponent,
        FavoriteBeersModalComponent,
        BeersItemDetailComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        SearchComponent,
        BeersPageComponent,
        BeersListComponent,
        BeersItemComponent,
        FavoriteBeersModalComponent,
        BeersItemDetailComponent,
    ],
})
export class FeaturesModule {
}
