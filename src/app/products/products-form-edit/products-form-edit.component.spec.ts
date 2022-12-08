import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormEditComponent } from './products-form-edit.component';

describe('ProductsFormEditComponent', () => {
  let component: ProductsFormEditComponent;
  let fixture: ComponentFixture<ProductsFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
