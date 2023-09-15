import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public popoverController: PopoverController) {}

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: e
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);
  }

}
