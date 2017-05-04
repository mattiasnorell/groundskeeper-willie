import { FIREBASE_PROVIDERS, AuthMethods, AuthProviders } from 'angularfire2';

export const FirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}