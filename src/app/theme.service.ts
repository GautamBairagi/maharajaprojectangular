import { Injectable } from '@angular/core';
import { AllService } from './Api/all.service'; 
import { BehaviorSubject } from 'rxjs';
import { ThemeSettings } from './Api/all.service';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private currentThemeSettings = new BehaviorSubject<ThemeSettings>({
    header_color: '#ffffff',
    sidebar_color: '#2f4f4f',
    header_font: '#000000',
    sidebar_font: '#000000'
  });

  constructor(private themeApiService: AllService) {}

    // Get current theme settings
  getThemeSettings() {
    return this.currentThemeSettings.asObservable();
  }

  // Load theme settings from the API
  // loadThemeSettingsFromApi() {
  //   this.themeApiService.fetchThemeSettings().subscribe((res:any) => {
  //     console.log('res from API:', res);
  //     this.currentThemeSettings.next({
  //       header_color: res.header_color,
  //       sidebar_color: res.sidebar_color,
  //       header_font_color: '#000000',  // Default or based on your needs
  //       sidebar_font_color: '#000000'  // Default or based on your needs
  //     });

  //     this.applyTheme(res);
  //   });
  // }


  loadThemeSettingsFromApi(): void {
    this.themeApiService.fetchThemeSettings().subscribe((response) => {
      console.log('API Response:', response);
  
      if (Array.isArray(response) && response.length > 0) {
        // Extract the first object from the array
        const settings = response[0];
  
        // Map the API fields to your ThemeSettings structure
        const updatedSettings = {
          header_color: settings.header_color || '#ffffff',
          sidebar_color: settings.sidebar_color || '#2f4f4f',
          header_font: settings.header_font, // Default or map if available in API
          sidebar_font: settings.sidebar_font // Default or map if available in API
        };
  
        console.log('Updated Theme Settings:', updatedSettings);
  
        // Update the BehaviorSubject and apply the theme
        this.currentThemeSettings.next(updatedSettings);
        this.applyTheme(updatedSettings);
      } else {
        console.error('Invalid API Response: Expected an array with theme settings.');
      }
    });
  }
  
  
  private updateThemeSettings(updatedSettings: ThemeSettings) {
    this.themeApiService.updateThemeSettings(updatedSettings).subscribe(() => {
      this.currentThemeSettings.next(updatedSettings);
      this.applyTheme(updatedSettings);
    });
  }

  applyTheme(settings: ThemeSettings): void {
    if (!settings) {
      console.error('No settings provided for theme application.');
      return;
    }
  
    console.log('Applying theme with settings:', settings);
  
    document.documentElement.style.setProperty('--header-color', settings.header_color || '#ffffff');
    document.documentElement.style.setProperty('--sidebar-color', settings.sidebar_color || '#2f4f4f');
    document.documentElement.style.setProperty('--header-font-color', settings.header_font || '#000000');
    document.documentElement.style.setProperty('--sidebar-font-color', settings.sidebar_font || '#000000');
  }
  

  // Update the theme settings via the API
// private updateThemeSettings(updatedSettings: ThemeSettings) {
//   this.themeApiService.updateThemeSettings(updatedSettings).subscribe(() => {
//     this.currentThemeSettings.next(updatedSettings);
//     this.applyTheme(updatedSettings);
//   });
// }
  

 // Update the header color
 updateHeaderColor(color: string) {
  const updatedSettings = { ...this.currentThemeSettings.value, header_color: color };
  this.updateThemeSettings(updatedSettings);
}

// Update the sidebar color
updateSidebarColor(color: string) {
  const updatedSettings = { ...this.currentThemeSettings.value, sidebar_color: color };
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




  
}
