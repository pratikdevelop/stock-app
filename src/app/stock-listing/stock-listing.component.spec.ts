import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListingComponent } from './stock-listing.component';

describe('StockListingComponent', () => {
  let component: StockListingComponent;
  let fixture: ComponentFixture<StockListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
