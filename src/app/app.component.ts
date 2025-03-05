import { Component } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'houses';

    constructor(private appConfigService: AppConfigService) { }

    async ngOnInit() {
       await this.appConfigService.loadConfig();
       console.log('App Config Loaded:', this.appConfigService);
    }
}
