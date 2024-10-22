import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({ "projectId": "fir-ionic-project-49b5c", 
      "appId": "1:292098212115:web:6de1c2259be2dcba3ddae6",
       "storageBucket": "fir-ionic-project-49b5c.appspot.com",
        "apiKey": "AIzaSyB0eI57bH4FqcjrLtLXnHPRC3FDw8x1Zxk",
         "authDomain": "fir-ionic-project-49b5c.firebaseapp.com",
          "messagingSenderId": "292098212115" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
