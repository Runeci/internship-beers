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

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        BeersPageComponent,
        BeersListComponent,
        BeersItemComponent,
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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
