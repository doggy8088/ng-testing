import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ShowDataComponent } from './show-data.component';

describe('ShowDataComponent', () => {
  let component: ShowDataComponent;
  let fixture: ComponentFixture<ShowDataComponent>;
  let httpController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDataComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDataComponent);
    component = fixture.componentInstance;
    httpController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // HttpTestingController
  // https://angular.io/api/common/http/testing/HttpTestingController
  it('should call api to URL', () => {
    const mockResult = { name: 'Kevin' };
    const expectedValue = 'Kevin!!';
    component.getData().subscribe(value => {
      expect(value).toEqual(expectedValue);
    });

    // Method 1
    // const req = httpController.expectOne('myurl');
    // expect(req.request.method).toEqual('GET');

    // Method 2
    const req = httpController.expectOne({
      method: 'GET',
      url: 'myurl'
    });

    req.flush(mockResult); // 這一行才會讓 HTTP 正式發出

    httpController.verify();
  });
});
