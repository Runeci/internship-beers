import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './features/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BeersPageComponent } from './features/beers/beers-page/beers-page.component';
import { BeersListComponent } from './features/beers/beers-page/beers-list/beers-list.component';
import { BeersItemComponent } from './features/beers/beers-page/beers-item/beers-item.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FavoriteBeersModalComponent } from './features/favorite-beers/favorite-beers-modal/favorite-beers-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BeersItemDetailComponent } from './features/beers/beers-item-detail/beers-item-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        BeersPageComponent,
        BeersListComponent,
        BeersItemComponent,
        ScrollToTopComponent,
        FavoriteBeersModalComponent,
        BeersItemDetailComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatDialogModule,
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
