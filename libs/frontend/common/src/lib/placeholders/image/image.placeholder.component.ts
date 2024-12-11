import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-image-placeholder',
  templateUrl: './image.placeholder.component.html',
})
export class ImagePlaceholderComponent {
  @Input() height: string = 'h-32';
  @Input() width?: string;
}
