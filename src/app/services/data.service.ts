import { Injectable } from '@angular/core'

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

  getAllWord(): Array<Data> {
    return this.Datas
  }

  getWord(word: string): Data {
    return this.Datas.filter((Data) => Data.word === word)[0]
  }
}
