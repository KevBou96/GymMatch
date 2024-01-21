import { Pipe, PipeTransform } from '@angular/core';
import { IFriend } from '../interfaces/user.interface';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: IFriend[], seachText: string): any[] {
    if (!items) return [];
    if (!seachText) return [];
    if (seachText == '') return items;

    seachText = seachText.toLowerCase();

    return items.filter((it: IFriend) => {
      return it.firstName.toLowerCase().includes(seachText) || it.lastName.toLowerCase().includes(seachText)
    });
  }

}
