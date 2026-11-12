import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModal } from './dialog-modal';

describe('DialogModal', () => {
  let component: DialogModal;
  let fixture: ComponentFixture<DialogModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
