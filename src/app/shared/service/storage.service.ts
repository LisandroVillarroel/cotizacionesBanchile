import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { decrypt, encrypt } from '@shared/utils/encriptador';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value !== null) {
      if (!environment.production) return decrypt<T>(value) as T;

      return JSON.parse(value) as T;
    }
    return null;
  }

  set(key: string, data: string): void {
    if (!environment.production) {
      data = encrypt(data);
    }
    localStorage.setItem(key, data);
  }

  remueve(key: string): void {
    // if (this.chequeaPlataformaService.chequeaSiBrowser()) {
    localStorage.removeItem(key);
    // }
  }
}
