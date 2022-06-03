import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MainService]
})
export class MainComponent implements OnInit {

  mainservice: MainService;
  users: any;
  filterUsers: any;
  search: string = '';
  filterByCategory:string= "all";

  constructor(private service: MainService, private router: Router) { this.mainservice = service }



  getUsers() {
    this.mainservice.getUsers().subscribe((data:any) => {
      console.log(data);
      this.users = data?.results;
      this.filterUsers = data?.results;
    })
  }

  changeGender(e:any){
    this.filterByCategory = e;
    switch (e){
      case 'all':
        this.filterUsers = this.users;
        break;
      default:
        let array = this.search.length > 0 ? this.filterUsers : this.users
        this.filterUsers = array.filter((item:any)=>item.gender === e)
    }
  }

  getSearchInput(input:string){
    this.filterUsers = this.users.filter((item:any)=>{
      if(this.filterByCategory === 'all')
        return item.name.first.toLowerCase().includes(input.toLowerCase())
      else
        return item.name.first.toLowerCase().includes(input.toLowerCase()) && item.gender == this.filterByCategory 
    });
    this.search = input;
  }

  async navigateToDetailed(id:number) {
    console.log(id)
    await this.router.navigateByUrl(`/main/${id}`, {
      state: { data: this.users[id] }
    });
  }

  ngOnInit(): void {
    this.getUsers()
  }

}
