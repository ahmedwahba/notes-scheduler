import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  @Output() themeToggledEvent = new EventEmitter<string>();
  public currentTheme = 'light-theme';

  onChangeThemeClick(): void {
    if (this.currentTheme === 'light-theme') {
      this.currentTheme = 'dark-theme';
    } else if (this.currentTheme === 'dark-theme') {
      this.currentTheme = 'light-theme';
    }
    this.themeToggledEvent.emit(this.currentTheme);
  }
}
