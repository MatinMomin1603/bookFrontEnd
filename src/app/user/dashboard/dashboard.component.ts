import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiServiceService } from 'src/app/services/api/api-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allBookData:any = [];
  popularBookData:any = [];
  resultedBookData:any = [];
  bookSearch:any='';


  constructor(public api: ApiServiceService, public router: Router) { }

  ngOnInit(): void {
    this.getBookData(this.bookSearch);
  }


  getBookData(search:any){
    this.allBookData = [];
    this.popularBookData = [];
    this.resultedBookData = [];
    this.api.getUserBookData(search).subscribe((res:any)=>{
    console.log('res :', res);
      if(res.status == true){
        this.allBookData = res.data
        if(this.allBookData.length > 5){
          this.allBookData.forEach((element:any,key:number) => {
            if(key < 5) this.popularBookData.push(element)
            else
            this.resultedBookData.push(element);
        });
        }
        else{
          this.popularBookData  = res.data ;
          this.resultedBookData  = res.data ;
        }
      
      }
      else{
        this.allBookData = [];
        alert(res.message);
      }
    })
  }

  gotoBookDetails(data:any){
    this.router.navigate(['user/book-details',data._id]);
  }
}
