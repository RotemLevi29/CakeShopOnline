import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';



@Component({
  selector: 'app-bar-directive',
  templateUrl: './bar-directive.component.html',
  styleUrls: ['./bar-directive.component.css']
})
export class BarDirectiveComponent implements OnInit {
  @Input()
  public data: any = [];

  constructor() { }

  ngOnInit(): void {
    console.log("this is data from bar directive child compoenent")
    console.log(this.data)
    // this.createSvg();
    // this.drawBars(this.data);
    // this.myFunction()
  }

  ngOnChanges() {
    console.log("ngOnChanges from child");
    console.log(this.data);
    console.log("this.data.length");
    console.log(this.data.length);
    if (this.data.length > 0) {
      this.createSvg();
      this.drawBars(this.data);
    }
  }
  // public timeout: any;

  // public myFunction() {
  //   this.timeout = setTimeout(this.alertFunc, 3000);
  // }

  // public alertFunc() {
  //   console.log("this.data after timeout")
  //   console.log(this.data)
  // }

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
