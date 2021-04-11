import { Component, OnInit } from '@angular/core'

import { Item } from './item'
import { DataService } from '../services/data.service'

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: Array<any>

  constructor(private DataService: DataService) {}

  ngOnInit(): void {
    this.items = this.DataService.getAllWord()
  }
}
