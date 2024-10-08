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
    const key = CryptoJS.enc.Base64.parse(this.secretKey)
    const iv = CryptoJS.lib.WordArray.create(new Uint8Array(16))
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }) 
    return encrypted.toString() 
  }

  // Decrypts the string by reversing the XOR operation
  decrypt(cipherText: string): string {
    // Parse the secret key from Base64
    const key = CryptoJS.enc.Base64.parse(this.secretKey)
    const iv = CryptoJS.lib.WordArray.create(new Uint8Array(16))
    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
