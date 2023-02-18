import { InjectionToken } from '@angular/core';
export const DAYS_API = new InjectionToken<string>('DAYS_API', {
  factory: () => 'http://localhost:3333/api',
});
