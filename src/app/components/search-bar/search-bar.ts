import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  readonly search = output<string>();
  protected readonly city = signal('');

  protected onInput(event: Event): void {
    this.city.set((event.target as HTMLInputElement).value);
  }

  protected submit(): void {
    const value = this.city().trim();
    if (value) {
      this.search.emit(value);
    }
  }
}