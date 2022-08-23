import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  public data: any = [];

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    try {
      this.data = await this.http.get<any[]>(environment.categoriesUrl + "products/agg-supllier").toPromise();

    }
    catch (err: any) {
      alert(err.message);
    }
    // this.data = await this.http.get<any[]>(environment.categoriesUrl + "products/agg-supllier").toPromise();
    console.log("this is data from bar component")
    console.log(this.data);

    this.createSvg();
    this.drawBars(this.data);
  }

  // private data = [
  //   { "name": "Vue", "count": "200", "Released": "2014" },
  //   { "name": "React", "count": "150", "Released": "2013" },
  //   { "name": "Angular", "count": "20", "Released": "2016" },
  //   { "name": "Backbone", "count": "30", "Released": "2010" },
  //   { "name": "Ember", "count": "40", "Released": "2011" },
  // ];

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-40,0)rotate(0)")
      .style("font-size", "20px")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .style("font-size", "20px")
      .attr("transform", "translate(-40,0)rotate(0)")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { name: string; }) => x(d.name))
      .attr("y", (d: { count: d3.NumberValue; }) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d: { count: d3.NumberValue; }) => this.height - y(d.count))
      .attr("fill", "#d04a35");
  }

}
