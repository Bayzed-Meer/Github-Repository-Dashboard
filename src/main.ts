import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x0QXxbf1x0ZFZMYF9bR3VPMyBoS35RckVnW3tec3VXRWVfWUF1'
);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
