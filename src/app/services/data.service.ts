import { Injectable } from '@angular/core'
import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';
export interface Data {
    word: string
    defi: string
  }

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private Datas = new Array<Data>(
    { word: "Dog", defi: 'สุนัข' },
    { word: "Cat", defi: 'เเมว' },
    { word: "Pig", defi: 'หมู' },
  )
  speakOptions:SpeakOptions;
  constructor(private tts:TNSTextToSpeech){
  }
  getAllWord(): Array<Data> {
    return this.Datas
  }

  getWord(word: string): Data {
    return this.Datas.filter((Data) => Data.word === word)[0]
  }
  sound(item){
    this.speakOptions = {
      text: item, /// *** required ***
      speakRate: 0.5, // optional - default is 1.0
      pitch: 1.0, // optional - default is 1.0
      volume: 1.0, // optional - default is 1.0
      locale: 'en-GB', // optional - default is system locale,
      finishedCallback: (data)=>{console.log(data)} // optional
    }
    this.tts.speak(this.speakOptions).then(()=>{
    })
  }
  add(word:string, definition:string){
    this.Datas.push({word: word, defi: definition})
  }
  edit(word:string, nWord:string, definition:string){
    for(let i =0;i<this.Datas.length;i++){
      if(this.Datas[i].word === word){
        this.Datas[i].word = nWord
        this.Datas[i].defi = definition
      }
    }
  }
  delete(word:string){
    for(let i =0;i<this.Datas.length;i++){
      if(this.Datas[i].word === word){
        this.Datas.splice(i,1)
      }
    }
  }
}