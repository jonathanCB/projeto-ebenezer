import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
 
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(v => {
      if (v) {
        console.log(v)
      } else {
        console.log('nada')
      }        
    });

    this.activatedRoute.params
    .subscribe(v => {
      if (v) {
        console.log(v)
      } else {
        console.log('nada')
      }        
    });

    this.activatedRoute.data
    .subscribe(v => {
      if (v) {
        console.log(v)
      } else {
        console.log('nada')
      }        
    });
  }

}
