import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-beers-page',
    templateUrl: './beers-page.component.html',
    styleUrls: ['./beers-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeersPageComponent {
}
