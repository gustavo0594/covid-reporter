import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

export class Country {
    Country: String;
    Slug: String;
    Province: String[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class CountryDetail {
    Country: String;
    Province: String;
    Lat: String;
    Lon: String;
    Date: String;
    Cases: Number;
    Status: String

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

@Injectable({
    providedIn: 'root'
})

export class CountryService {

    private baseUrl: String = 'https://api.covid19api.com/'

    constructor(private httpClient: HttpClient) { }

    getCountries(): Observable<Country[]> {
        return this.httpClient
            .get(this.baseUrl + 'countries')
            .map((countries: []) => { return countries.map((country) => new Country(country)); });
    }

    getCountry(slug: String, status: String): Observable<CountryDetail[]> {
        return this.httpClient
            .get(this.baseUrl + 'country/' + slug + '/status/' + status + '/live')
            .map((details: []) => { return details.map((detail) => new CountryDetail(detail)); })
            .map((details: []) => { return details.sort((a:CountryDetail, b: CountryDetail) => b.Cases.valueOf() - a.Cases.valueOf()); })
    }
}