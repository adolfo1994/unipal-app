import { Http } from '@angular/http';
import {Injectable} from "@angular/core";

@Injectable()
export class FriendAutoCompleteService {
  labelAttribute = "name";

  constructor(private http:Http) {

  }
  getResults(keyword:string) {
    return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
      .map(
        result =>
        {
          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
  }
}
