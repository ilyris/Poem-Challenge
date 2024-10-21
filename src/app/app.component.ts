import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoetrysearchformComponent } from './components/poetrysearchform/poetry-search-form.component';
import { PoemCardComponent } from './components/poem-card/poem-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PoetrysearchformComponent, PoemCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poetry-challenge';
}
