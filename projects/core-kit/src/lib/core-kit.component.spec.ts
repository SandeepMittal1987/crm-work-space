import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreKitComponent } from './core-kit.component';

describe('CoreKitComponent', () => {
  let component: CoreKitComponent;
  let fixture: ComponentFixture<CoreKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoreKitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoreKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
