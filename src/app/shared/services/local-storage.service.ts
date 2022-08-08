import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    public saveToLocalStorage(key: string, value: unknown): void {
        const strVal = JSON.stringify(value);
        localStorage.setItem(key, strVal);
    }

    public getFromLocalStorage(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }
}
