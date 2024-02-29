import { makeStateKey } from '@angular/platform-browser';

export const USER_TOKEN_KEY = makeStateKey<string>('user_token');
