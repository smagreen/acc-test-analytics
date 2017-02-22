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
  table: CapabilityTable;
  dataReady: Boolean  = false;

  constructor(private capabilityService: CapabilityService ) { }

  ngOnInit() {
   this.capabilityService.getCapabilityTableObs().subscribe(
     c => this.table = c,
     e => console.log('error:', e),
     () => { this.dataReady = true; this.resolveTableIds();}
   );
  }

  resolveTableIds() {
    const x = this.sumCapabilitiesAtIntersection('6', '2');
    console.log('total: ', x);
  }

  private sumCapabilitiesAtIntersection(componentId: string, attributeId: string ) {
    return this.table.capabilities.filter(c => {
      return c.componentId === componentId && c.attributeId === attributeId;
    }).length;
  }
}
