import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';

/**
 * This service regroups all firebase authentication logic
 * @author Bastien Nicoud
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Store current authentication state */
  private authState = null;
  /** Store authenticated user observable */
  private user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Get user observable
    this.user = afAuth.user;
    // Register an observer on the auth state
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  /**
   * Check current user authentication, return true if authenticated
   */
  get authenticated(): boolean {
    return this.authState !== null;
  }

  /**
   * Get current user datas if authenticated
   */
  get authenticatedUser(): Observable<User> {
    return this.user;
  }

  /**
   * Sign up new user
   */
  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => this.updateUserDatas())
      .catch(error => console.error(error));
  }

  /**
   * Sign in user
   */
  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => this.updateUserDatas())
      .catch(error => console.error(error));
  }

  /**
   * Sign out user and redirect to homepage
   */
  signOut(): void {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['/']))
      .catch(error => console.error(error));
  }

  /**
   * Update user datas
   */
  private updateUserDatas(): void {
    // Update user firestore representation
    console.log('Update firestore user representation');
  }
}
