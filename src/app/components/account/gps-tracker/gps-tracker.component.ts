import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-gps-tracker',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './gps-tracker.component.html',
  styleUrl: './gps-tracker.component.scss'
})
export class GpsTrackerComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;

  map!: google.maps.Map;
  vehicleMarker!: google.maps.Marker;

  route = [
    { lat: 50.4501, lng: 30.5234 },
    { lat: 50.4601, lng: 30.5244 },
    { lat: 50.4701, lng: 30.5254 },
    { lat: 50.4801, lng: 30.5264 },
    { lat: 50.4901, lng: 30.5274 },
  ];

  animationSpeed = 50; // Швидкість анімації (мс на один крок)
  currentStep = 0;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.addVehicleMarker();
    this.animateVehicle();
  }

  initMap(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.route[0],
      zoom: 13,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-100"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 65
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": "50"
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-100"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
            {
              "lightness": "30"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
            {
              "lightness": "40"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "hue": "#ffff00"
            },
            {
              "lightness": -25
            },
            {
              "saturation": -97
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "lightness": -25
            },
            {
              "saturation": -100
            }
          ]
        }
      ],
    });

    new google.maps.Polyline({
      path: this.route,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: this.map,
    });
  }

  addVehicleMarker(): void {
    const markerIcon = {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="currentColor" class="bi bi-car-front-fill" viewBox="0 0 16 16">
           <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
        </svg>
      `), // Вставляємо SVG код
      scaledSize: new google.maps.Size(30, 30), // Масштаб іконки
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 15),
    };

    this.vehicleMarker = new google.maps.Marker({
      position: this.route[0],
      map: this.map,
      icon: markerIcon, // Іконка маркера
      title: 'Vehicle',
    });
  }

  animateVehicle(): void {
    let index = 0;
    const step = 0.01; // Крок переміщення (чим менший, тим плавніше)
    const interval = setInterval(() => {
      if (index < this.route.length - 1) {
        const start = this.route[index];
        const end = this.route[index + 1];

        const lat = this.lerp(start.lat, end.lat, this.currentStep);
        const lng = this.lerp(start.lng, end.lng, this.currentStep);

        this.vehicleMarker.setPosition({ lat, lng });
        this.map.setCenter({ lat, lng });

        this.currentStep += step;

        if (this.currentStep >= 1) {
          this.currentStep = 0;
          index++;
        }
      } else {
        clearInterval(interval);
      }
    }, this.animationSpeed);
  }

  lerp(start: number, end: number, t: number): number {
    return start + t * (end - start);
  }
}
