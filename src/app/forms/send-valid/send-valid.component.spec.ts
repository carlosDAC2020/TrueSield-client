import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendValidComponent } from './send-valid.component';

describe('SendValidComponent', () => {
  let component: SendValidComponent;
  let fixture: ComponentFixture<SendValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendValidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
