import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfternoonComponent } from './afternoon.component';
import { By } from '@angular/platform-browser';

describe('AfternoonComponent', () => {
  let component: AfternoonComponent;
  let fixture: ComponentFixture<AfternoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfternoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfternoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // 要有這一行，元件的 ngOnInit() 才會被執行
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('message should be ON', () => {
    component.clicked();
    expect(component.isOn).toBeTruthy();
    expect(component.message).toBe('ON');
  });

  it('message should be OFF', () => {
    component.isOn = true;
    component.clicked();
    expect(component.isOn).toBeFalsy();
    expect(component.message).toBe('OFF');
  });

  it('display should be ON', () => {
    let nativeElement = fixture.debugElement.nativeElement as HTMLElement;
    let spanElement = nativeElement.querySelector('span') as HTMLSpanElement;
    component.clicked();
    fixture.detectChanges(); // 要有這一行才會執行變更偵測
    expect(spanElement.innerHTML).toContain('ON');
  });

  it('display should be OFF', () => {
    let nativeElement = fixture.debugElement.nativeElement as HTMLElement;
    let spanElement = nativeElement.querySelector('span') as HTMLSpanElement;
    component.isOn = true;
    fixture.detectChanges(); // 要有這一行才會執行變更偵測
    expect(spanElement.innerHTML).toContain('ON');

    component.clicked();
    fixture.detectChanges(); // 要有這一行才會執行變更偵測
    expect(spanElement.innerHTML).toContain('OFF');
  });


  it('display should be ON using debugElement', () => {

    var de = fixture.debugElement.query(By.css('#btn'));
    de.triggerEventHandler('click', {});

    fixture.detectChanges(); // 要有這一行才會執行變更偵測

    var span = fixture.debugElement.query(By.css('span'));

    expect(span.nativeElement.innerHTML).toContain('ON');
  });

  it('display should be ON and allow component to async operation', () => {
    let nativeElement = fixture.debugElement.nativeElement as HTMLElement;
    let spanElement = nativeElement.querySelector('span') as HTMLSpanElement;
    component.clicked();
    fixture.detectChanges(); // 要有這一行才會執行變更偵測
    fixture.whenStable().then(() => {
      expect(spanElement.innerHTML).toContain('ON');
    })
  });
});
