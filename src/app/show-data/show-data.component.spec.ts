import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ShowDataComponent } from './show-data.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ShowDataComponent', () => {
  let component: ShowDataComponent;
  let fixture: ComponentFixture<ShowDataComponent>;
  let httpController: HttpTestingController;

  describe('Testing by HttpClientTestingModule', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ShowDataComponent ],
        imports: [ HttpClientTestingModule ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA]
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

    it('use spyOn', () => {
      const mockResult = { name: 'Kevin' };
      const expectedValue = 'Kevin!!';

      spyOn(component['http'], 'get').and.returnValue(of(mockResult));

      component.getData().subscribe(value => {
        expect(component['http'].get).toHaveBeenCalledWith('myurl');
        expect(value).toEqual(expectedValue);
      })
    });

  });


  describe('Testing by jasmine.createSpyObj', () => {
    let spyHttpGet = jasmine.createSpyObj('http', ['get']);

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ShowDataComponent ],
        providers: [
          {
            provide: HttpClient,
            useValue: spyHttpGet
          }
        ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ShowDataComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('use spyObject', () => {

      const mockResult = { name: 'Kevin' };
      const expectedValue = 'Kevin!!';

      spyHttpGet.get.and.returnValue(of(mockResult));

      component.getData().subscribe(value => {
        expect(component['http'].get).toHaveBeenCalledWith('myurl');
        expect(value).toEqual(expectedValue);
      });

    });

  });

});
