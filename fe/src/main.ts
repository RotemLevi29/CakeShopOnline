import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import socketIoService from './app/services/SocketIoService';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

socketIoService.connect();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
