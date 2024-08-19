import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventCommunicationService } from '../services/event-communication.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { DistributorService } from '../services/distributor.service';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any;
  lowestTicketPrice: number | undefined;
  highestTicketPrice: number | undefined;
  user: any;
  authorName: string | undefined;
  emailOfLoggedUser$: Observable<string | null>;
  isModeration: boolean = false;
  distributorAddress: string | undefined; 
  ticketCounts = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
    private distributorService: DistributorService,
    private eventCommunicationService: EventCommunicationService
  ) {
    this.emailOfLoggedUser$ = this.userService.getCurrentUserEmail();

  }

  ngOnInit(): void {
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    this.eventService.getEventById(eventId).subscribe(
      data => {
        this.event = data;
        this.user = data.user;
        this.eventService.getEventLowestPrice(eventId).subscribe(lowestPrice => {
          this.lowestTicketPrice = lowestPrice;
        });      
        
        this.userService.isModeration$.subscribe(isModeration => {
          this.isModeration = isModeration;
        });

        this.eventService.getEventHighestPrice(eventId).subscribe(highestPrice => {
          this.highestTicketPrice = highestPrice;
        });

        this.eventService.getEventAuthor(eventId).subscribe(authorData => {
          this.authorName = authorData.name;
        });

        // Pobieranie dystrybutora na podstawie event.distributorId
        if (this.event.distributorId) {
          this.distributorService.getDistributorById(this.event.distributorId).subscribe(
            distributor => {
              this.distributorAddress = distributor.searchAddress; // Ustawianie adresu dystrybutora
            },
            error => {
              console.error('Error fetching distributor:', error);
            }
          );
        }
      },
      error => {
        console.error('Error fetching event details:', error);
        this.event = {};
      }
    );
  }

  voteDown(): void {
    this.emailOfLoggedUser$.subscribe(email => {
      if (email) {
        this.userService.getAccountByEmail(email).subscribe(
          user => {
            const token = localStorage.getItem('token');
            const loginResponse = { token: token || '', userId: user.id };
            this.eventService.addMinus(this.event.id, loginResponse).subscribe(
              updatedEvent => {
                console.log('Minus added and event updated:', updatedEvent);
                this.event = updatedEvent;
                this.eventCommunicationService.updateEventInList(updatedEvent);
              },
              error => {
                console.error('Error adding minus:', error);
              }
            );
          },
          error => {
            console.error('Error fetching user account by email:', error);
          }
        );
      } else {
        this.eventCommunicationService.navigateTo('/login', false);
      }
    });
  }  

  voteUp(): void {
    this.emailOfLoggedUser$.subscribe(email => {
        if (email) {
            this.userService.getAccountByEmail(email).subscribe(
                user => {
                    const token = localStorage.getItem('token');
                    const loginResponse = { token: token || '', userId: user.id };
                    this.eventService.addPlus(this.event.id, loginResponse).subscribe(
                        updatedEvent => {
                            console.log('Plus added and event updated:', updatedEvent);
                            this.event = updatedEvent;
                            this.eventCommunicationService.updateEventInList(updatedEvent);
                        },
                        error => {
                            console.error('Error adding plus:', error);
                        }
                    );
                },
                error => {
                    console.error('Error fetching user account by email:', error);
                }
            );
        } else {
          this.eventCommunicationService.navigateTo('/login', false);
        }
    });
}

openDistributorPage(): void {
  if (this.distributorAddress && this.event?.name) {
    const url = `${this.distributorAddress}/${encodeURIComponent(this.event.name)}`;
    window.open(url, '_blank');
  } else {
    console.error('Distributor address or event name is not available');
  }
}

reportThisEvent(): void {
  if (this.userService.isLoggedIn()) {
    this.emailOfLoggedUser$.subscribe(email => {
      if (email) {
        this.userService.getAccountByEmail(email).subscribe(
          user => {
            const token = localStorage.getItem('token');
            const loginResponse = { token: token || '', userId: user.id };
            if (!this.event.isReported) {
              this.eventService.reportEvent(this.event.id, loginResponse).subscribe(
                updatedEvent => {
                  console.log('Event was reported:', updatedEvent);
                  this.event.isReported = true;
                  this.eventCommunicationService.updateEventInList(updatedEvent);
                },
                error => {
                  console.error('Error reporting event:', error);
                }
              );
            } else {
              this.eventService.undoReportEvent(this.event.id, loginResponse).subscribe(
                updatedEvent => {
                  console.log('Report was undone:', updatedEvent);
                  this.event.isReported = false;
                  this.eventCommunicationService.updateEventInList(updatedEvent);
                },
                error => {
                  console.error('Error undoing report:', error);
                }
              );
            }
          },
          error => {
            console.error('Error fetching user account by email:', error);
          }
        );
      } else {
        this.eventCommunicationService.navigateTo('/login', false);
      }
    });
  } else {
    console.log("Użytkownik nie jest zalogowany, przekierowanie do logowania.");
    this.eventCommunicationService.navigateTo('/login', false);
  }
}

  loadImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/events/default.PNG';
  }

  goBack(): void {
    this.eventCommunicationService.navigateTo('events', true);
    this.eventCommunicationService.requestEventListRefresh(() => this.eventService.getSortedEventsByVotes());
  }

  getImageStyle(event: any): string {
    const aspectRatio = event.image.width / event.image.height;
    if (aspectRatio > 1) {
      return 'landscape-image';
    } else if (aspectRatio < 1) {
      return 'portrait-image';
    } else {
      return 'square-image';
    }
  }
}
