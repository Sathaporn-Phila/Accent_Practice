import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { DataService } from '../services/data.service'

@Component({
    selector: 'ns-practice',
    templateUrl: './practice.component.html',
    styleUrls: ["./practice.component.css"]
  })
export class Practicecomponent implements OnInit {
    
    constructor(private DataService: DataService , private router: Router) {
        
    }
    
    words : Array<any>;
    original_words: Array<any>;
    word_compare: string;
    ngOnInit(): void {
        this.original_words = this.DataService.getAllWord()
        this.words = this.DataService.getAllWord()
        
    }
    
    goDetail(word : string){
        this.router.navigate(["/practice", word]);
    }
    back() {
        this.router.navigate(["/homepage"]);
    }
}