import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuList } from './restaurant-menu-list';

describe('RestaurantMenuList', () => {
  let component: RestaurantMenuList;
  let fixture: ComponentFixture<RestaurantMenuList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMenuList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantMenuList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
