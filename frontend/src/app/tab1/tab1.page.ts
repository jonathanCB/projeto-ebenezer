import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LoginService } from '../login-service/login.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  carrega = false;
  private _mostraBotaoAddPost: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    console.log(this.loginService.isAdmin)
    if (this.loginService.isAdmin) {
      this._mostraBotaoAddPost = true;
    }
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
      this.carrega = true;
    }, 500);
  }

  public get mostraBotaoAddPost(): boolean {
    return this._mostraBotaoAddPost;
  }
}
