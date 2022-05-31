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

  constructor(private service: MainService, private router: Router) { this.mainservice = service }



  getUsers() {
    this.mainservice.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    })
  }

  navigateToDetailed(id:number) {
    console.log(id)
    this.router.navigateByUrl(`/main/${id}`, {
      state: { data: this.users.results }
    });
  }

  ngOnInit(): void {
    this.getUsers()
  }

}
