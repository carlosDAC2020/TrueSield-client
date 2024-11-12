import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInitialViewComponent } from './home-initial-view.component';

describe('HomeInitialViewComponent', () => {
  let component: HomeInitialViewComponent;
  let fixture: ComponentFixture<HomeInitialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInitialViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeInitialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
