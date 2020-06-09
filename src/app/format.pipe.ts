import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'format',
    pure:false
})
export class FormatPipe implements PipeTransform {
  transform(array: any, completed?:any, valueTimes?:any, checkedValue?:any, numberOfCat?:any,admin?:any,moderationOn?:any,myQuestion?:any,name?:any): any {
  
   
    let arrayCopy = array || [];
    if(completed) {
      arrayCopy = arrayCopy.filter((item) => item.newComment?.find((elem) => elem.checked === true));
    }
    if(valueTimes === 'day') {
      arrayCopy = arrayCopy.filter((item) => new Date().getTime() - item.date < 86400000 ? true : false);
    }
    if(valueTimes === 'week') {
      arrayCopy = arrayCopy.filter((item) => new Date().getTime() - item.date < 604800000 ? true : false);
    }

    if(valueTimes === 'month') {
      arrayCopy = arrayCopy.filter((item) => new Date().getTime() - item.date < 2.628e+9 ? true : false);
    }

    if(checkedValue) {
      arrayCopy = arrayCopy.filter((item) => item.togs.find((elem,i) => i+1 === numberOfCat));
      // F"?
    }

    if(!admin) {
      arrayCopy = arrayCopy.filter((item) => item.approve === true ? true : false);
    }

    if(moderationOn) {
      arrayCopy = arrayCopy.filter((item) => item.approve === false ? true : false)
    }

    if(myQuestion) {
      arrayCopy = arrayCopy.filter((item) => item.name === name ? true : false)
    }

    return arrayCopy;
  }
}