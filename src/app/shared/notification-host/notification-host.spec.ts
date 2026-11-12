import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationHost } from './notification-host';

describe('NotificationHost', () => {
  let component: NotificationHost;
  let fixture: ComponentFixture<NotificationHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationHost],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationHost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
