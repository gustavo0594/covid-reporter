import { Component } from '@angular/core';
import { CountryService, Country } from '../services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countries: Country[];
  countriesData: Country[];

  constructor(private service: CountryService) { }

  ngOnInit() {
    this.getCountries()
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getCountries() {
    this.service.getCountries().subscribe((countries: Country[]) => {
      this.countries = countries;
      this.countriesData = countries
    });
  }

  onSearch(ev) {
    this.countries = this.countriesData.filter((country) => country.Country.includes(ev.detail.value))
  }
}
