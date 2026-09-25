import { computed, Service, signal } from '@angular/core';
import { LoginCredentials, User } from './auth.model';

/* @Injectable({
  providedIn: 'root'
}) */
@Service()
export class AuthService {
  private readonly activeUser = signal<User | undefined>(undefined);
  readonly isAuthenticated = computed(() => this.activeUser() !== undefined);

  async login(credentials: LoginCredentials) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { username } = credentials;
    this.activeUser.set({ username });
    
    // this.activeUser.set({
    //   username: credentials.username
    // });
    
    // const user: User = {
    //   username: credentials.username
    // };
    // this.activeUser.set(user);
  }

  logout() {
    this.activeUser.set(undefined);
  }
}
