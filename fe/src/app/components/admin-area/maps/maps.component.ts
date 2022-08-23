import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


// markersUrl

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  public markers: marker[]

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    try {
      this.markers = await this.http.get<any[]>(environment.markersUrl).toPromise();

    }
    catch (err: any) {
      alert(err.message);
    }
    console.log("this is markers data from maps component")
    console.log(this.markers);

  }

  title = 'פריסת הסניפים שלנו על גבי המפה (Google Maps, Developer Mode)';
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 32.180466;
  lng: number = 34.900845;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
