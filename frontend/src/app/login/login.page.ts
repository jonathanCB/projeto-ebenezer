import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { LoginService } from '../login-service/login.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLinkWithHref, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  usuario: FormControl = new FormControl();
  senha: FormControl = new FormControl();

  constructor(private router: Router, private loginService: LoginService, private alertController: AlertController) { }

  entrar(): void {
    this.loginService.isAdmin = false;
    this.router.navigate(['/tabs'])
  }

  async login() {
    if (this.usuario.value && this.usuario.value.includes('admin') && this.senha.value && this.senha.value.includes('123456')) {
      this.loginService.isAdmin = true;
      setTimeout(() => {
        this.usuario.setValue('');
        this.senha.setValue('');
        this.router.navigate(['/tabs']);
      }, 500);
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: "Usuário ou senha incorretos. Tente novamente!",
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }

}
