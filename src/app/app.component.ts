import { Component, OnInit } from '@angular/core';
import { ThemeManagerService } from './common/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentTheme: string;

  constructor(private themeService: ThemeManagerService) {
    this.currentTheme = this.themeService.currentTheme;
  }

  ngOnInit(): void {
    this.themeService.themeToggledEvent.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }
}
