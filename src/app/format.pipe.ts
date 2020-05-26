import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'format',
    pure:false
})
export class FormatPipe implements PipeTransform {
  transform(array: any, completed?:any, valueTimes?:any, checkedValue?:any, numberOfCat?:any): any {
  
    let arrayCopy = [];
    arrayCopy = array;
    if(completed) {
      arrayCopy = array.filter((item) => item.newComment?.find((elem) => elem.checked === true));
    }
    if(valueTimes === 'day') {
      arrayCopy = array.filter((item) => new Date().getTime() - item.date < 86400000 ? true : false);
    }
    if(valueTimes === 'week') {
      arrayCopy = array.filter((item) => new Date().getTime() - item.date < 604800000 ? true : false);
    }

    if(valueTimes === 'month') {
      arrayCopy = array.filter((item) => new Date().getTime() - item.date < 2.628e+9 ? true : false);
    }
    if(valueTimes === 'all_time') {
      arrayCopy = array;
    }

    if(checkedValue) {
      arrayCopy = array.filter((item) => item.togs.find((elem,i) => i+1 === numberOfCat));
    }

    return arrayCopy;
  }
}