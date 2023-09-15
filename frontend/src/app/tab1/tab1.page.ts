import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { LoginService } from '../login-service/login.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { PostVO } from '../add-post/PostVO';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  postsSaved: PostVO[] = [
    new PostVO('', '1 Doação de alimentos', 'Ação solidária', 'Ação solidária para doação de alimentos em Cachoeirinha.'),
    new PostVO('', '2 Doação de roupas', 'Ação solidária', 'Ação solidária para doação de roupas em Cachoeirinha.'),
    new PostVO('', '3 Evangelizando', 'Ação solidária', 'Evangelização na Escola Municipal de Alvorada.'),
    new PostVO('', '4 Doação de alimentos', 'Ação solidária', 'Ação solidária para doação de alimentos em Cachoeirinha.'),
    new PostVO('', '5 Doação de roupas', 'Ação solidária', 'Ação solidária para doação de roupas em Cachoeirinha.'),
    new PostVO('', '6 Evangelizando', 'Ação solidária', 'Evangelização na Escola Municipal de Alvorada.'),
    new PostVO('', '7 Doação de alimentos', 'Ação solidária', 'Ação solidária para doação de alimentos em Cachoeirinha.'),
    new PostVO('', '8 Doação de roupas', 'Ação solidária', 'Ação solidária para doação de roupas em Cachoeirinha.'),
    new PostVO('', '9 Evangelizando', 'Ação solidária', 'Evangelização na Escola Municipal de Alvorada.'),
    new PostVO('', '10 Doação de alimentos', 'Ação solidária', 'Ação solidária para doação de alimentos em Cachoeirinha.'),
    new PostVO('', '11 Doação de roupas', 'Ação solidária', 'Ação solidária para doação de roupas em Cachoeirinha.'),
    new PostVO('', '12 Evangelizando', 'Ação solidária', 'Evangelização na Escola Municipal de Alvorada.')
  ]
  postsView: PostVO[] = []
  private _mostraBotaoAddPost: boolean = false;

  constructor(private loginService: LoginService, private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.carregaItensView();
    if (this.loginService.isAdmin) {
      this._mostraBotaoAddPost = true;
    }
  }

  // Passando os posts do array contendo todos os posts 
  // para o array que mostrará os posts "por demanda".
  // dessa forma poderemos usar o recurso "infinite scroll"
  // do ionic. 
  private carregaItensView() {
    const pos = this.postsView.length;
    //Carregaremos de 2 em 2 posts na tela.
    for (let i = 0; i < 2; i++) {
      if (this.postsSaved[pos + i]) {
        this.postsView.push(this.postsSaved[pos + i]);
      }
    }
  }

  // Cada vez que rolarmos o scroll até o final da página,
  // este método será ativado.
  onIonInfinite(ev: any) {
    setTimeout(() => {
      // Restrição para não chamarmos o método carregaItensView() 
      // quando não ouver mais posts salvos no array que guarda
      // os posts.
      if (this.postsView.length < this.postsSaved.length) {
        this.carregaItensView();
      }
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  async openAddPost() {
    const modal = await this.modalCtrl.create({
      component: AddPostComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
    }
  }

  public get mostraBotaoAddPost(): boolean {
    return this._mostraBotaoAddPost;
  }
}
