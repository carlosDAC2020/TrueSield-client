import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionsGrafComponent } from './interactions-graf.component';

describe('InteractionsGrafComponent', () => {
  let component: InteractionsGrafComponent;
  let fixture: ComponentFixture<InteractionsGrafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractionsGrafComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteractionsGrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
