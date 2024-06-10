import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNewsViewComponent } from './search-news-view.component';

describe('SearchNewsViewComponent', () => {
  let component: SearchNewsViewComponent;
  let fixture: ComponentFixture<SearchNewsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchNewsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchNewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
