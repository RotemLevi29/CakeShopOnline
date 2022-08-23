import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }

  @HostBinding("style.background-color")
  public color: string = "";

  @HostListener("mouseenter")
  public setColor(): void {
    this.color = "yellow";
  }

  @HostListener("mouseleave")
  public removeColor(): void {
    this.color = "";
  }

}
