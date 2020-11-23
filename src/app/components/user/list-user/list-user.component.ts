import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.sass']
})
export class ListUserComponent implements OnInit {

  curSortDir: any = {};
  advSearch: boolean = false;

  //Add pagination
  paginationConfig: any;
  pageLimit: number = 5;
  pageCurrentNumber: number = 1;
  pageConfigData: any = {};
  pageData: any = {};
  pageTotal: number = 0;
  urserList:any;
  username:any;
  loader:boolean = true;

  constructor(public Service:AppService, public router:Router,public toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loader = false;
    this.Service.get()
    .subscribe(
      res => {
        this.loader = true;
        this.urserList = res;
      });
  }

  sortedList(data: any, sortBy: string, sortDir: boolean){
    //true - asc / false - desc
    ////console.log('>>>', data);
    if(data.length){
        if(sortBy === 'fname'){
          //console.log(">>>Enter type...");
          this.curSortDir.fname = !sortDir;
          if(this.curSortDir.fname){
            let array = data.slice().sort((a, b) => (a.fname > b.fname) ? 1 : -1)
            this.urserList = array;
          }
          if(!this.curSortDir.fname){
            let array = data.slice().sort((a, b) => (a.fname < b.fname) ? 1 : -1)
            this.urserList = array;
            //data.sort((a, b) => (a.training_course_type < b.training_course_type) ? 1 : -1);
          }
        }
        if(sortBy === 'email'){
          //console.log(">>>Enter type...");
          this.curSortDir.email = !sortDir;
          if(this.curSortDir.email){
            let array = data.slice().sort((a, b) => (a.email > b.email) ? 1 : -1)
            this.urserList = array;
          }
          if(!this.curSortDir.email){
            let array = data.slice().sort((a, b) => (a.email < b.email) ? 1 : -1)
            this.urserList = array;
            //data.sort((a, b) => (a.training_course_type < b.training_course_type) ? 1 : -1);
          }
        }
    }
  }

  filterSearchSec(){
    this.advSearch = !this.advSearch
  }

  filterSearchSubmit() {
    
    if(this.username == undefined || this.username == ''){
      this.loadData();
    }else if(this.username != '') {
        this.Service.searchParam(this.username)
        .subscribe(
          res => {
            this.urserList = res;
          });
      }
    // this.urserList.filter(res => res.fname = this.username);
  }

  signOut(){
    localStorage.setItem('email','');
    this.router.navigateByUrl('/sign-in');
  }

  deleteRow(id) {
    if(id) {
      this.loader = false;
      this.Service.delete(id)
      .subscribe(
        res => {
          this.loadData();
          this.loader = true;
          this.toastr.success('User Deleted Successfully');
        });
      }
  }
}
