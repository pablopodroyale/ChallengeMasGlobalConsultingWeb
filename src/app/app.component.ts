import { Component, Output, Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  @Output() public loading:boolean;

  title = 'ChallengeMasGlobalConsultingWeb';

  /**
   *
   */
  constructor() {
    this.loading = false;
  }

  public getName(): boolean {
    return this.loading;
  }

  public setLoading(value: boolean): void {
    this.loading = value;
  }
}
