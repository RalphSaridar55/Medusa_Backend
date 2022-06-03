import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-detailed',
  templateUrl: './main-detailed.component.html',
  styleUrls: ['./main-detailed.component.css']
})
export class MainDetailedComponent implements OnInit {
  userDetails: any;
  router:Router;

  constructor(private route: Router) {
    this.router = route 
    this.userDetails = this.route.getCurrentNavigation()?.extras.state?.data
  }

  ngOnInit(): void {
    // let segments: any = this.router.getCurrentNavigation()?.finalUrl?.root?.children?.primary?.segments;
    // console.log(segments[segments.length - 1].path);
    // let id: number = segments[segments.length - 1].path
    // this.userDetails = this.router
    // console.log(this.userDetails)
  }


}
