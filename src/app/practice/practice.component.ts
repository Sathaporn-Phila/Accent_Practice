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
    search(keyword:string){
        if(keyword.length>0){
            this.words = [];
            for(let index=0;index<this.original_words.length;index++){
                this.word_compare = this.original_words[index].word;
                if(keyword.toLowerCase() === this.word_compare.slice(0,keyword.length).toLocaleLowerCase()){
                    this.words.push(this.original_words[index]);
                }
            }
        }
        else{
            this.words = this.DataService.getAllWord()
        }
    }
    goDetail(word : string){
        this.router.navigate(["/practice", word]);
    }
    back() {
        this.router.navigate(["/homepage"]);
    }
}