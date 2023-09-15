import { Component, Input, OnInit } from '@angular/core';
import { PostVO } from '../add-post/PostVO';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {
  @Input() postVO!: PostVO;

  constructor() { }

  ngOnInit() {}

}
