import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-graph-directive',
  templateUrl: './graph-directive.component.html',
  styleUrls: ['./graph-directive.component.css']
})
export class GraphDirectiveComponent implements OnInit {
  public data: any = [];

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    try {
      const result = await this.http.get<any[]>(environment.categoriesUrl + "products/agg-supllier").toPromise();
      this.data = [...result];
    }
    catch (err: any) {
      alert(err.message);
    }
    // this.data = await this.http.get<any[]>(environment.categoriesUrl + "products/agg-supllier").toPromise();
    console.log("this is data from app-graph-directive-component component")
    console.log(this.data);
  }

}
