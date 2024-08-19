import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  private apiUrl = 'http://localhost:5260/api/distributor';

  constructor(private http: HttpClient) { }

  getAllDistributors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError<any[]>('getAllDistributors', []))
    );
  }

  // Pobieranie dystrybutora po ID
  getDistributorById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getDistributorById id=${id}`))
    );
  }

  // Dodawanie nowego dystrybutora
  addDistributor(distributor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, distributor).pipe(
      catchError(this.handleError<any>('addDistributor'))
    );
  }

  // Aktualizowanie dystrybutora
  updateDistributor(id: number, distributor: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, distributor).pipe(
      catchError(this.handleError<any>('updateDistributor'))
    );
  }

  // Usuwanie dystrybutora
  deleteDistributor(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('deleteDistributor'))
    );
  }

  // Obsługa błędów
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(error.message));
    };
  }
}
