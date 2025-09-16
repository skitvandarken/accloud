import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-parceiros',
  imports: [],
  templateUrl: './parceiros.component.html',
  styleUrl: './parceiros.component.css'
})
export class ParceirosComponent implements AfterViewInit {

 

  ngAfterViewInit(): void {
    const sliderInner = document.querySelector('.slider-inner') as HTMLElement;
    
    // Clone all images and append them for seamless loop
    if (sliderInner) {
      sliderInner.innerHTML += sliderInner.innerHTML;
    }
  }

}