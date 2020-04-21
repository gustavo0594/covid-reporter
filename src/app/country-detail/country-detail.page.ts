import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService, CountryDetail } from '../services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
})
export class CountryDetailPage implements OnInit {

  countryDetails: CountryDetail[];
  private slug: String
  country: String

  constructor(private countryService: CountryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.country = this.activatedRoute.snapshot.paramMap.get('country');
    this.getCountryDetail("confirmed")
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.getCountryDetail(ev.detail.value)
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Countries' : '';
  }

  private getCountryDetail(status: String) {
    this.countryService.getCountry(this.slug, status).subscribe((countries: CountryDetail[]) => {
      console.log(countries)
      this.countryDetails = countries;
    });
  }

}
