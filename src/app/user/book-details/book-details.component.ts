import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api/api-service.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
   bookData:any;
   book_id:any;
   currentUser:any;
  constructor(public api: ApiServiceService,public activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.book_id = params.get('id');
    } )
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.getBookDetails();
  }

  getBookDetails(){
    let data = {
      book_id: this.book_id,
      user_id: this.currentUser._id
    }
          this.api.getUserBookDeatils(data).subscribe((res:any)=>{
            if(res.status == true){
              this.bookData = res.data[0];
            }else{
               alert(res.message);
               this.bookData = '';
            }
          })
  }

}
