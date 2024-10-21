import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetrysearchformComponent } from './poetry-search-form.component';

describe('PoetrysearchformComponent', () => {
  let component: PoetrysearchformComponent;
  let fixture: ComponentFixture<PoetrysearchformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoetrysearchformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PoetrysearchformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
