import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptionService } from '../encryption-service/encryption.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncryptionInterceptorService implements HttpInterceptor {

  constructor(private encryptionHelper: EncryptionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Encrypt the outgoing request body (POST/PUT)
    if (req.method === 'POST') {
      const encryptedBody = this.encryptionHelper.encrypt(JSON.stringify(req.body));
      req = req.clone({
        body: encryptedBody,
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Expect the response as text to allow decryption
    req = req.clone({
      responseType: 'text',
    });

    // Handle the response, including decryption
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Log the raw encrypted response
          console.log('Encrypted response received:', event.body);

          try {
            // Decrypt the response
            const decryptedBody = this.encryptionHelper.decrypt(event.body);

            // Log the decrypted response
            console.log('Decrypted response body:', decryptedBody);

            // Parse the decrypted response into JSON format
            return event.clone({ body: JSON.parse(decryptedBody) });
          } catch (error) {
            console.error('Error decrypting response:', error);
          }
        }
        return event;
      })
    );
  }
}
