import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey: string;

  constructor() {
    this.secretKey = environment.SecretKey
  }

  encrypt(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ this.secretKey.charCodeAt(i % this.secretKey.length));
    }
    return btoa(result); // Convert to base64
  }

  // Decrypts the string by reversing the XOR operation
  decrypt(cipherText: string): string {
    const decodedText = atob(cipherText); // Decode base64
    let result = '';
    for (let i = 0; i < decodedText.length; i++) {
      result += String.fromCharCode(decodedText.charCodeAt(i) ^ this.secretKey.charCodeAt(i % this.secretKey.length));
    }
    return result;
  }
}
