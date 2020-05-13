import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  form: FormGroup;
  description:string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.title;
  }

  ngOnInit() {
    const latPattern = "^(\\+|-)?((\\d((\\.)|\\.\\d{1,6})?)|(0*?[0-8]\\d((\\.)|\\.\\d{1,6})?)|(0*?90((\\.)|\\.0{1,6})?))$"
    const longPattern = "^(\\+|-)?((\\d((\\.)|\\.\\d{1,6})?)|(0*?\\d\\d((\\.)|\\.\\d{1,6})?)|(0*?1[0-7]\\d((\\.)|\\.\\d{1,6})?)|(0*?180((\\.)|\\.0{1,6})?))$"

    this.form = this.formBuilder.group({
      name: new FormControl('', [ Validators.required ]),
      lat: new FormControl('',[Validators.required, Validators.pattern(latPattern)]),
      long: new FormControl('', [Validators.required, Validators.pattern(longPattern)])
    });
  }

  save() {
    if(this.form.valid)
      this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
  
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
}


