import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexService } from '../services/index/index.service';
import { LoadTasksJSService } from '../services/load-tasks-js.service';
import { LoginService } from '../services/login/login.service';
import { ConfirmValidator } from '../cors/confirmValidator';
import { Router } from '@angular/router';
import { AccountService } from '../services/login/account.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild('closeModal') closeModal:any;
  SignUpForm: FormGroup;
  LoginForm: FormGroup;
  public isLoggedIn:boolean;
  constructor(
    // private ScriptLoader : LoadTasksJSService,
    private fb: FormBuilder,
    private route: Router,
    private indexServ: IndexService,
    private loginService: LoginService,
    private accountService: AccountService) {
      // this.loadScripts();
      this.isLoggedIn=this.accountService.isLoggedIn();
    }

  ngOnInit(): void {
    this.SignUpForm = this.fb.group({
      username: ['',
     [ Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)]
    ],
      password: ['',
      Validators.required
      ],
      password_confirmation: ['',
      Validators.required
      ]
    }, {validator: ConfirmValidator('password', 'password_confirmation')});
    this.LoginForm = this.fb.group({
      username: ['',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)]
      ],
      password: ['',
      Validators.required
      ]
    })
  }

  get SignForm(){ return this.SignUpForm.controls}
  get loginForm(){ return this.LoginForm.controls}
  createUser(){
    let data = {... this.SignUpForm.value}
    console.log(data);
    this.indexServ.create(data).subscribe((res) =>{
      console.log('data inserted successfully');
      this.closeModal.nativeElement.click();
      this.SignUpForm.reset();
  })
  }
  loginUser(){
    this.loginService.login(this.loginForm.username.value, this.loginForm.password.value)
    .subscribe((res) => {
      this.closeModal.nativeElement.click();
      this.loginService.setToken(res);
      this.route.navigate(['/dashboard']);
    },
    error => {
        console.log(error);
    })
  }
  Logout(){
    this.loginService.logout().subscribe((res) =>{
      this.loginService.removeToken();
      window.location.reload()
    });
  }
// this code is used to load js files separantly or ocly in a specific component
  //  loadScripts() {
  //   this.ScriptLoader.load('tasksjs').then(data => {
  //   }).catch(error => console.log(error));
  // }
}
