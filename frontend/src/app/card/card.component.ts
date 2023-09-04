import { Component, Input, OnInit } from '@angular/core';
import { CardVO } from './CardVO';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {
  @Input() cardVO!: CardVO;

  constructor() { }

  ngOnInit() {}

}
