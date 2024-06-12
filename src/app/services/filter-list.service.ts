import { Injectable } from '@angular/core';
import { ItemReddit, ItemRss, ItemX } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FilterListService {

  constructor() { }

  filterByStringAttributes(models: Array<ItemRss | ItemReddit | ItemX| any>, searchText: string): Array<ItemRss | ItemReddit | ItemX> {
    if (!searchText) {
      return models;
    }

    searchText = searchText.toLowerCase();

    return models.filter(model => {
      for (const key in model) {
        if (typeof model[key] === 'string' && model[key].toLowerCase().includes(searchText)) {
          return true;
        }
      }
      return false;
    });
  }

  filterByModelType(models: Array<ItemRss | ItemReddit | ItemX>, types: string[]){
    if (!types || types.length === 0) {
      return models;
    }

    const lowerCaseTypes = types.map(type => type.toLowerCase());

    return models.filter(model => lowerCaseTypes.includes(model.type_item.toLowerCase()));
  }
}
