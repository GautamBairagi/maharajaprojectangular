import { Injectable } from '@angular/core';
import { AllService } from './Api/all.service'; 
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSettings = new BehaviorSubject({
    headerColor: '#ffffff',
    sidebarColor: '#2f4f4f',
    headerFontColor: '#000000',
    sidebarFontColor: '#000000'
  });

  constructor(private themeApiService: AllService) {}

    // Get current theme settings
  getThemeSettings() {
    return this.currentThemeSettings.asObservable();
  }

  // Load theme settings from the API
  loadThemeSettingsFromApi() {
    this.themeApiService.fetchThemeSettings().subscribe((settings) => {
      this.currentThemeSettings.next({
        headerColor: settings.header_color,
        sidebarColor: settings.sidebar_color,
        headerFontColor: '#000000',  // Default or based on your needs
        sidebarFontColor: '#000000'  // Default or based on your needs
      });

      this.applyTheme(settings);
    });
  }

  // Update the header color
  updateHeaderColor(color: string) {
    const updatedSettings = { ...this.currentThemeSettings.value, header_color: color };
    this.updateThemeSettings(updatedSettings);
  }

  // Update the sidebar color
  updateSidebarColor(color: string) {
    const updatedSettings = { ...this.currentThemeSettings.value, sidebar_Color: color };
    this.updateThemeSettings(updatedSettings);
  }

  // Update the header font color
  updateHeaderFontColor(color: string) {
    const updatedSettings = { ...this.currentThemeSettings.value, header_font: color };
    this.updateThemeSettings(updatedSettings);
  }

  // Update the sidebar font color
  updateSidebarFontColor(color: string) {
    const updatedSettings = { ...this.currentThemeSettings.value, sidebar_font: color };
    this.updateThemeSettings(updatedSettings);
  }

  // Apply the theme to the DOM
  applyTheme(settings:any) {
    document.documentElement.style.setProperty('--header-color', settings.header_color);
    document.documentElement.style.setProperty('--sidebar-color', settings.sidebar_color);
    document.documentElement.style.setProperty('--header-font-color', settings.header_font_color);
    document.documentElement.style.setProperty('--sidebar-font-color', settings.sidebar_font_color);
  }

  // Update the theme settings via the API
  private updateThemeSettings(updatedSettings:any) {
    this.themeApiService.updateThemeSettings(updatedSettings).subscribe(() => {
      this.currentThemeSettings.next(updatedSettings);
      this.applyTheme(updatedSettings);
    });
  }
  
}
