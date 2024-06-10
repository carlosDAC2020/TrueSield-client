import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InferenceGrafComponent } from './inference-graf.component';

describe('InferenceGrafComponent', () => {
  let component: InferenceGrafComponent;
  let fixture: ComponentFixture<InferenceGrafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InferenceGrafComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InferenceGrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
