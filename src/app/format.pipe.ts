import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(array: any, completed?:any, valueTimes?:any, checkedValue?:any, numberOfCat?:any): any {
  
    if(completed) {
      return array.filter((item) => item.newComment?.find((elem) => elem.checked === true));
    }
    else if(valueTimes === 'day') {
      return array.filter((item) => {
        if(new Date().getTime() - item.date < 86400000) {
          return true;
        }
        return false;
      });
    }
    else if(valueTimes === 'week') {
      return array.filter((item) => {
        if(new Date().getTime() - item.date < 604800000) {
          return true;
        }
        return false;
      });
    }

    else if(valueTimes === 'month') {
      return array.filter((item) => {
        if(new Date().getTime() - item.date < 2.628e+9) {
          return true;
        }
        return false;
      });
    }

    else if(checkedValue) {
      return array.filter((item) => item.togs.find((elem,i) => i+1=== numberOfCat));
    }

    return array;
  }
}