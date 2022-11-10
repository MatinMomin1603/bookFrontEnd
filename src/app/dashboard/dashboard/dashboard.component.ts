import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  closeResult:any;
  constructor(public modalService: NgbModal, public api: ApiServiceService) { }
 allBookData:any = [];
 currentBookData:any;
 book_name:any= '';
 author_name:any = '';
 description:any = '';
 book_name_edit:any= '';
 author_name_edit:any = '';
 description_edit:any = '';
 selected_file:any = '';


  ngOnInit(): void {
    this.getBooksData();
  }

  getBooksData(){
    this.api.getBook().subscribe((res:any)=>{
      if(res.status == true){
        this.allBookData  = res.data;
      }else{
        alert(res.message);
      }
    })
  }

  addBookModalpopup(content:any){
    // this.modal.open(content, { backdropClass: 'light-blue-backdrop' });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  editbook(book:any,content:any){
    this.currentBookData = book;      
    this.book_name_edit = this.currentBookData.name;
    this.author_name_edit = this.currentBookData.author;
    this.description_edit = this.currentBookData.description;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  updateBook(){
    if(this.book_name_edit == null || this.book_name_edit == undefined || this.book_name_edit =='') {
      alert("Please Write Book Name..!!!");
      return;
    }
    else if(this.author_name_edit == null || this.author_name_edit == undefined || this.author_name_edit ==''){
      alert("Please write Author Name..!!!");
      return;
    }else if(this.description_edit == null || this.description_edit == undefined || this.description_edit ==''){
      alert("Please write Description..!!!");
      return;
    } else {
      let book = {
        name: this.book_name_edit,
        author: this.author_name_edit,
        description: this.description_edit,
        _id: this.currentBookData._id
      }
      this.api.updateBook(book).subscribe((res:any)=>{
             if (res.status == true) {
                 alert(res.message);
                 this.getBooksData();
             } else {
              alert(res.message);
             }
      this.modalService.dismissAll();

      }) 
    }
  }

  submitBook(){
    const book: FormData = new FormData();
    if(this.book_name == null || this.book_name == undefined || this.book_name =='') {
      alert("Please Write Book Name..!!!");
      return;
    }
    else if(this.author_name == null || this.author_name == undefined || this.author_name ==''){
      alert("Please write Author Name..!!!");
      return;
    }else if(this.description == null || this.description == undefined || this.description ==''){
      alert("Please write Description..!!!");
      return;
    } else {
      book.append('name',this.book_name);
      book.append('author',this.author_name);
      book.append('description',this.description);
      book.append('file', this.selected_file);
      this.api.submitBook(book).subscribe((res:any)=>{
             if (res.status == true) {
                 alert(res.message);
                 this.book_name = '';
                 this.author_name = '';
                 this.description = '';
                 this.selected_file = '';
                 this.getBooksData();
             } else {
              alert(res.message);
             }
      this.modalService.dismissAll();

      }) 
    }
  }

  selectFile(event:any){
     this.selected_file = event.target.files[0];
  }

}
