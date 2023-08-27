import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationRegularExpression } from "src/app/constants/validations";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [
        "",
        Validators.required,
        Validators.pattern(ValidationRegularExpression.Name),
      ],
      contactNumber: [
        "",
        Validators.required,
        Validators.pattern(ValidationRegularExpression.PhoneNumber),
      ],
      address: [""],
      shopName: [
        "",
        Validators.required,
        Validators.pattern(ValidationRegularExpression.Name),
      ],
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
