import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { LoginService } from '../login-service/login.service';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  carrega = false;
  private _mostraBotaoAddPost: boolean = false;

  constructor(private loginService: LoginService, private modalCtrl: ModalController) {}

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

  async openAddPost() {
    const modal = await this.modalCtrl.create({
      component: AddPostComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  public get mostraBotaoAddPost(): boolean {
    return this._mostraBotaoAddPost;
  }
}
