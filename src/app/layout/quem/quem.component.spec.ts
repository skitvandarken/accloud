import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemComponent } from './quem.component';

describe('QuemComponent', () => {
  let component: QuemComponent;
  let fixture: ComponentFixture<QuemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
