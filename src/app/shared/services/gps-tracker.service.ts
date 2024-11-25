import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpsTrackerService {
  private mockData = [
    {
      id: 1,
      name: 'Car 1',
      location: { lat: 50.4501, lng: 30.5234 },
      status: 'active',
      lastUpdated: '2024-11-22T10:00:00'
    },
    {
      id: 2,
      name: 'Car 2',
      location: { lat: 49.8397, lng: 24.0297 },
      status: 'inactive',
      lastUpdated: '2024-11-21T18:00:00'
    },
    {
      id: 3,
      name: 'Car 3',
      location: { lat: 48.6208, lng: 22.2879 },
      status: 'active',
      lastUpdated: '2024-11-22T08:30:00'
    }
  ];

  getVehicles(): Observable<any[]> {
    return of(this.mockData);
  }
}
