// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail // Add this import
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  constructor() {}

  async register({ email, password }: { email: string; password: string }) {
    try {
      const credentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const ref = doc(this.firestore, `users/${credentials.user.uid}`);
      setDoc(ref, { email });
      return credentials;
    } catch (e) {
      console.log("Error in register: ", e);
      return null;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const credentials = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return credentials;
    } catch (e) {
      console.log("Error in login: ", e);
      return null;
    }
  }

  // Add this new method for password reset
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return Promise.resolve();
    } catch (error) {
      console.log("Error in resetPassword: ", error);
      return Promise.reject(error);
    }
  }

  logout() {
    return signOut(this.auth);
  }
}