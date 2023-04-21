import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  constructor(private http: HttpClient) { }

  
  public callMock() {
    console.log("calling mock");
    this.http.post("https://api-i1f.louisvuitton.com/eco-eu/lvcom-checkout-eapi/v1/checkout/eng-us/customer-info/advanced-query", {"c360GoldenId": "004e90a9-2fb9-4a3a-b245-196b4295dc42","worldwideId": "","dreamId": "34513363","salesforceId": "","userIdentitySalesforceId": "","atgId": "","rmsLocalId": "","firstName": "Nancy","lastName": "Rogers","firstName2": "","lastName2": "","birthDate": "2012-10-01","passportNumber": "","fiscalNumber": "","emailAddress": "wenjing861226@126.com","phoneNumber": "18857155778","residencePostalAddress": {"addressLine1": "","addressLine2": "","addressLine3": "","countryCodeIso": "","state": "","city": "","postalCode": ""},"greyMarketStatusDate": "","lastContactDate": "2012-10-01T09:45:00.000+02:00","serialNumber": "","lockNumber": ""} , { "headers" : { 'client_id':'de98aeab74da47dd98676d427cafff73', 'client_secret':'bA895C0EE1E040f095C6F4E4C9230b9f', 'countryCodeIso4':'USA', 'Authorization':'Basic VnVpdHRvbjpSdjY1bEQzUw=='}}).subscribe(

      (data) => console.log(data)


    );
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/