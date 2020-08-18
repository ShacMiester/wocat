import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    submit: new FormControl(''),
  });
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async submit() {
    if (this.form.valid) {
      console.log(this.form.value)
    }
  }


}
