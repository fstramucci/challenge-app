import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg = '';
  errorMsg = '';

  errorString = {
    email: [
      {
        type: 'required',
        message: 'Ingresá tu correo electrónico'
      },
      {
        type: 'pattern',
        message: 'El correo electrónico no es válido'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'Ingresá una contraseña'
      },
      {
        type: 'minlength',
        message: 'El largo mínimo de la contraseña es de 6 caracteres'
      }
    ]
  };

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  signIn(value) {
    this.ionicAuthService.signinUser(value)
      .then((response) => {
        console.log(response);
        this.errorMsg = '';
        this.router.navigateByUrl('dashboard');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = '';
      });
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }

}
