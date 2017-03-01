import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IComponent, IAttribute, MatrixElement, CapabilityMatrix } from '../../model/capability.model';
import { CapabilityService } from '../capability.service';

@Component({
  templateUrl: './capability-matrix.component.html',
  styles: ['.clickable { cursor: pointer }']
})
export class CapabilityMatrixComponent implements OnInit {
  matrix: CapabilityMatrix;
  dataReady: Boolean  = false;
  selectedElement: MatrixElement;
  intersectionDescription: string;
  convenience: number[][];

  constructor(private router: Router, private capabilityService: CapabilityService ) { }

  ngOnInit() {

   this.capabilityService.getCapabilityData().subscribe(
     c => this.matrix = c,
     e => console.log('error:', e),
     () => {
        this.buildConvenienceArray();
        this.dataReady = true;
     }
   );
  }

  private buildConvenienceArray() {
      this.convenience = new Array(this.matrix.components.length);
      for (let row = 0; row < this.matrix.components.length; row++)  {
        this.convenience[row] = new Array(this.matrix.components.length);
        for (let col = 0; col < this.matrix.attributes.length; col++) {
          const res = this.getCapabilitiesByAttrAndComp(this.matrix.attributes[col].id, this.matrix.components[row].id);
          this.convenience[row][col] = (res && res.capabilities.length > 0) ? res.capabilities.length : 0;
        }
      }
  }

  private getCapabilitiesByAttrAndComp(attributeId: string, componentId: string) {
    return this.matrix.elements.find(e => (e.attribute.id === attributeId && e.component.id === componentId));
  }

  selectIntersection(attribute: IAttribute, component: IComponent) {
    this.intersectionDescription = component.name + ' is ' + attribute.name;
    // this.selectedElement = this.getCapabilitiesByAttrAndComp(attribute.id, component.id);

    this.router.navigate(['/capabilities'], { queryParams: {attr: attribute.id, comp: component.id}});
 }
}
