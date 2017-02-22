import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CapabilityTable } from '../../shared/capability-table.model';
import { CapabilityService } from '../capability.service';

@Component({
  selector: 'app-capability-list',
  templateUrl: './capability-list.component.html',
  styleUrls: ['./capability-list.component.css']
})
export class CapabilityListComponent implements OnInit {
  capabilityData: CapabilityTable;
  matrix: Intersection[];
  dataReady: Boolean  = false;

  constructor(private capabilityService: CapabilityService ) { }

  ngOnInit() {
   this.capabilityService.getCapabilityTable().subscribe(
     c => this.capabilityData = c,
     e => console.log('error:', e),
     () => {
        this.matrix = this.buildMatrix(this.capabilityData);
        console.log(this.matrix);
        this.dataReady = true;
     }
   );
  }

  buildMatrix(capabilityData: CapabilityTable): Intersection[] {
    const table: Intersection[] = [];

    capabilityData.components.forEach((c) => {
      const current = new Intersection(c.name);
      table.push(current);
      capabilityData.attributes.forEach((a) => {
          const numC = this.sumCapabilitiesAtIntersection(c.id, a.id);
          current.attributes.push({name: a.name, count: numC } );
      });
    });

    return table;
  }

  private sumCapabilitiesAtIntersection(componentId: string, attributeId: string ) {
    return this.capabilityData.capabilities.filter(c => {
      return c.componentId === componentId && c.attributeId === attributeId;
    }).length;
  }
}

class Intersection {
  component: string;
  attributes: {name: string, count: number}[] ;
  constructor(componentName: string) {
    this.component = componentName;
    this.attributes = [];
  }
}
