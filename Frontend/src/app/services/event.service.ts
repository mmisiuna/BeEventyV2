import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5260/api/event';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllValidEvents`);
  }
  
  getSortedEvents(sortType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events?sort=${sortType}`);
  }
  
  getLowestTicketPrice(eventId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${eventId}/lowest-price/`);
  }

  getHighestTicketPrice(eventId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${eventId}/highestTicketPrice`);
  }

  getSortedEventsByDate(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sort/date`);
  }

  getSortedEventsByVotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sort/votes`);
  }

  getSortedEventsByClosestDate(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sort/closest`);
  }

  searchEvents(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: { searchTerm } });
  }

  getEventById(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${eventId}`);
  }
  
  addPlus(eventId: number, loginResponse: { token: string, userId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/plus`, loginResponse).pipe(
        tap(response => {
            console.log('Response from server:', response);
        })
    );
  }

 addMinus(eventId: number, loginResponse: { token: string, userId: number }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/${eventId}/minus`, loginResponse).pipe(
    tap(response => {
      console.log('Response from server:', response);
    })
  );
}

refreshEvent(eventId: number): Observable<any> {
  console.log('refreshEvent called with:', eventId);
  return this.http.get<any>(`${this.apiUrl}/${eventId}`);
}

  getEventAuthor(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/author/${eventId}`);
  }

  getEventLowestPrice(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${eventId}/lowestTicketPrice`);
  }
  
  getEventHighestPrice(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${eventId}/highestTicketPrice`);
  }

  getEventsReportedByUser(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`reportedEvents/byAccount/${accountId}`);
  }

  reportEvent(eventId: number, loginResponse: { token: string, userId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/report`, loginResponse).pipe(
      tap(response => {
          console.log('Response from server:', response);
      })
    );
  }

  undoReportEvent(eventId: number, loginResponse: { token: string, userId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/unreport`, loginResponse).pipe(
      tap(response => {
          console.log('Response from server:', response);
      })
    );
  }

  searchAndSortEvents(searchTerm: string, sortType: string): Observable<any[]> {
    if (searchTerm.trim()) {
      const url = `${this.apiUrl}/searchAndSort?searchTerm=${encodeURIComponent(searchTerm)}&sortType=${encodeURIComponent(sortType)}`;
      return this.http.get<any[]>(url).pipe(
        catchError(error => {
          console.error('Error fetching sorted events:', error);
          return of([]);
        })
      );
    } else {
      // If searchTerm is empty, get all events with the selected sort type
      switch (sortType) {
        case 'date':
          return this.getSortedEventsByDate();
        case 'votes':
          return this.getSortedEventsByVotes();
        case 'closest':
          return this.getSortedEventsByClosestDate();
        default:
          return this.getSortedEventsByDate(); // Default to date sorting
      }
    }
  }

}
