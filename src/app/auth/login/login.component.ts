import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api/api-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentDiv:any = "adminLogin";
  adminData = {
    email: '',
    password:''
  }
  userData = {
    email: '',
    password:'',
    name:''
  }
  adminpasswordSH:boolean = false;
  userpasswordSH:boolean = false;
  constructor(public router: Router, public api: ApiServiceService) { }

  ngOnInit(): void {
    localStorage.clear();
  }


  login(){
    const admin_data = {
      email: this.adminData.email,
      password: this.adminData.password
    }
    this.api.login(admin_data).subscribe((res:any)=>{
      if(res.status == true){
        localStorage.setItem('currentUser',  JSON.stringify(res.data));
        this.router.navigate(['/admin/dashboard']);
      }
      else{
        alert(res.message)
        console.log("error");
      }
    })
  }

  userlogin(){
    const user = {
      email: this.userData.email,
      password: this.userData.password
    }
   
    this.api.userLogin(user).subscribe((res:any)=>{
      if(res.status == true){
      localStorage.setItem('currentUser',  JSON.stringify(res.data));
      this.router.navigate(['/user/dashboard']);
      }
      else{
        console.log("error");
alert(res.message)
      }
    })
  }

  userSignUp(){
    const user = {
      name: this.userData.name,
      email: this.userData.email,
      password: this.userData.password,
    }
    this.api.usersignUp(user).subscribe((res:any)=>{
      if(res.status == true){
        alert(res.message);
        this.changeDiv('userLogin');
      }
      else console.log("error");
    })
  }

  changeDiv(state:any){
    this.adminData = {
      email: '',
      password:''
    }
    this.userData = {
      name: '',
      email:'',
      password:''
    }
    this.currentDiv = state;
    window.scroll(0,0);

  }
}
