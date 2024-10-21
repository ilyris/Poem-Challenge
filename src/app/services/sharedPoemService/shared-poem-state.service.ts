// shared-state.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Poem } from '../../../typings/poem';

@Injectable({
  providedIn: 'root',
})
export class SharedPoemState {
  searchedPoem: WritableSignal<Poem | null> = signal<Poem | null>(null);

  constructor() {}

  updateSearchedPoem(newValue: Poem) {
    this.searchedPoem.set(newValue);
  }
}
