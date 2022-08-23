import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  public data: any[];


  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    try {
      this.data = await this.http.get<any[]>(environment.categoriesUrl + "products/agg").toPromise();

    }
    catch (err: any) {
      alert(err.message);
    }
    // this.data = await this.http.get<any[]>(environment.categoriesUrl + "products/agg-supllier").toPromise();
    console.log("this is data from pie component")
    console.log(this.data);
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  // private data = [
  //   { "name": "Vue", "count": "166443", "Released": "2014" },
  //   { "name": "React", "count": "150793", "Released": "2013" },
  //   { "name": "Angular", "count": "62342", "Released": "2016" },
  //   { "name": "Backbone", "count": "27647", "Released": "2010" },
  //   { "name": "Ember", "count": "21471", "Released": "2011" },
  // ];
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.count.toString()))
      .range(["#c7d3ec", "#a5b8db", "#a5b8bb", "#879cc4", "#677795", "#5a6782", "#5a6882"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.count));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: { data: { name: any; }; }) => d.data.name)
      .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }


}
