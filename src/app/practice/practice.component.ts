import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";

import { DataService } from '../services/data.service'

@Component({
    selector: 'ns-practice',
    templateUrl: './practice.component.html'
  })
export class Practicecomponent implements OnInit {
    
    
    constructor(private DataService: DataService , private router: Router) {
        
    }
    words : Array<any>
    ngOnInit(): void {
        this.words = this.DataService.getAllWord()
        console.log(this.words)
    }
    
    goDetail(word : string){
        this.router.navigate(["/practice", word]);
    }
}