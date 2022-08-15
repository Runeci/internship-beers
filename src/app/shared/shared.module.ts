import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';


@NgModule({
    declarations: [
        ScrollToTopComponent,
    ],
    imports: [
        CommonModule,
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
    exports: [
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
        ScrollToTopComponent,
    ]
})
export class SharedModule {
}
