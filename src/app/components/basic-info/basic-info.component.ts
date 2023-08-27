import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-basic-info",
  templateUrl: "./basic-info.component.html",
  styleUrls: ["./basic-info.component.scss"]
})
export class BasicInfoComponent implements OnInit {

  form!: any;

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get("products");
    console.log("abcccccc",this.form);
    this.form.controls.pop()?.valueChanges.subscribe((value:any) => console.log("valueeee",value)) 
  }
}
