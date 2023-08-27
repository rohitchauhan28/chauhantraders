import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PrintbillsComponent } from "./printbills.component";

describe("PrintbillsComponent", () => {
  let component: PrintbillsComponent;
  let fixture: ComponentFixture<PrintbillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintbillsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
