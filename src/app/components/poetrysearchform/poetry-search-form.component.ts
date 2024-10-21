import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PoetryApiService } from '../../services/poetryService/poetry-api.service';
import { MatSelectModule } from '@angular/material/select';
import { SharedPoemState } from '../../services/sharedPoemService/shared-poem-state.service';

interface Title {
  title: string;
}
interface Poem {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}
@Component({
  selector: 'poetry-search-form',
  templateUrl: './poetry-search-form.component.html',
  styleUrls: ['./poetry-search-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class PoetrysearchformComponent {
  selectedAuthorName = new FormControl('', Validators.required);
  titleFormControl = new FormControl('', Validators.required);

  authors: string[] = [];
  authorTitles: Title[] = [];
  selectedAuthor: string = '';
  selectedTitle: string = '';

  constructor(
    private poetryApiService: PoetryApiService,
    private sharedPoemState: SharedPoemState
  ) {
    this.selectedAuthorName.valueChanges.subscribe((value) => {
      if (!value) return;
      this.selectedAuthor = value;
      this.showTitles(value);
    });

    this.titleFormControl.valueChanges.subscribe((value) => {
      if (!value) return;
      this.selectedTitle = value;
    });
  }

  ngOnInit() {
    this.showAuthors();
  }

  onClick() {
    // Fetch poem by author & title.
    this.poetryApiService
      .getPoemByAuthorAndTitle(this.selectedAuthor, this.selectedTitle)
      .subscribe({
        next: (data: Poem[]) => {
          console.log(data);
          this.sharedPoemState.updateSearchedPoem(data[0]);
        },
        error: (err) => {
          console.error('Error fetching poems:', err);
        },
      });
  }
  showTitles(author: string) {
    this.poetryApiService.getAuthorTitles(author).subscribe({
      next: (data) => {
        console.log(data);
        this.authorTitles = data;
      },
      error: (err) => {
        console.error('Error fetching titles:', err);
      },
    });
  }

  showAuthors() {
    this.poetryApiService.getAuthors().subscribe({
      next: (data) => {
        this.authors = data.authors;
        console.log(this.authors);
      },
      error: (err) => {
        console.error('Error fetching authors:', err);
      },
    });
  }
}
