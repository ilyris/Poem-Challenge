import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedPoemState } from '../../services/sharedPoemService/shared-poem-state.service';

interface Poem {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}

@Component({
  selector: 'app-poem-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './poem-card.component.html',
  styleUrls: ['./poem-card.component.scss'],
})
export class PoemCardComponent {
  constructor(private sharedPoemState: SharedPoemState) {}

  getSearchedPoemData(): Poem | null {
    const poem = this.sharedPoemState.searchedPoem();
    if (poem) {
      return poem;
    } else {
      console.warn('No poem data available.');
      return null;
    }
  }
}
