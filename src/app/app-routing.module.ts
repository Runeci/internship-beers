import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeersPageComponent } from './features/beers/beers-page/beers-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'beers', pathMatch: 'full' },
    { path: 'beers', component: BeersPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
