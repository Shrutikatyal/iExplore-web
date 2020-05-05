import { InjectionToken } from '@angular/core';

export const INIT_COORDS = new InjectionToken<{latitude: number, longitude: number}>('INIT_COORDS');