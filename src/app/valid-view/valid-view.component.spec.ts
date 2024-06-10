import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidViewComponent } from './valid-view.component';

describe('ValidViewComponent', () => {
  let component: ValidViewComponent;
  let fixture: ComponentFixture<ValidViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
