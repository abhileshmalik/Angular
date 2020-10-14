import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
})
export class TemplateDrivenFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.value.password !== form.value.confirmPassword) {
      alert('Password & confirm password not matched. Try Again!');
    } else {
      alert('Form submitted succesfully!');
      form.reset();
    }
  }
}
