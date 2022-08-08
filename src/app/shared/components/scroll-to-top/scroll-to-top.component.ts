import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-scroll-to-top',
    templateUrl: './scroll-to-top.component.html',
    styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {
    public windowScrolled: boolean;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    @HostListener('window:scroll', [])
    public onWindowScroll() {
        if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 10) {
            this.windowScrolled = true;
        } else if (this.windowScrolled && window.scrollY
            || document.documentElement.scrollTop
            || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }

    public scrollToTop() {
        (function smoothScroll() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothScroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }
}
