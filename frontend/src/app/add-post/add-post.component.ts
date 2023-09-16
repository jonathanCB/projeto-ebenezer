import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { PostVO } from './PostVO';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  form!: FormGroup;
  name: string = '';
  imageSrc!: string;

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private alertController: AlertController) { }

  ngOnInit(): void {
    this.createForm();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (this.form.valid) {
      const alert = await this.alertController.create({
        header: 'Sucesso!',
        message: "Post adicionado com sucesso.",
        buttons: ['OK'],
        cssClass: 'success-alert'
      });

      await alert.present();

      this.modalCtrl.dismiss(
        new PostVO(
          this.form.controls['img'].value,
          this.form.controls['title'].value,
          this.form.controls['subtitle'].value,
          this.form.controls['description'].value,
        ),
        'confirm'
      );
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: "Verifique se você preencheu todos os campos.",
        buttons: ['OK'],
        cssClass: 'error-alert'
      });

      await alert.present();
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      img: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      subtitle: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  async loadPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    if (imageUrl) {
      this.form.controls['img'].setValue(imageUrl);
    }
  }
}
