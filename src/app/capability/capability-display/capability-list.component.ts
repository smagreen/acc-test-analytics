import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { IAttribute, ICapability, IComponent } from '../../model/capability.model';
import { CapabilityService } from '../capability.service';
import { ComponentService } from '../../component/component.service';
import { AttributeService } from '../../attribute/attribute.service';

@Component({
  selector: 'app-capability-list',
  templateUrl: './capability-list.component.html'
})
export class CapabilityListComponent implements OnInit {
  routeSubs: Subscription;
  capabilites: ICapability[];
  filteredCapabilities: ICapability[];
  attrId: string;
  componentId: string;
  dataReady: Boolean  = false;
  attribute: string;
  component: string;
  errorMessage: string;
  attributes: IAttribute[];
  components: IComponent[];

  constructor(  private router: Router, private activatedRoute: ActivatedRoute,
                private capabilityService: CapabilityService, private attributeService: AttributeService,
                private componentService: ComponentService ) { }

  ngOnInit() {

    this.routeSubs = this.activatedRoute.queryParams.subscribe(param => {
        this.attrId = param['attr'];
        this.componentId = param['comp'];
        this.getCapabilityData();
    });

    this.attributeService.getAttributes().subscribe(
      a => this.attributes = a,
      e => this.handleError,
      () => this.attribute = this.attributes.find(a => a.id === this.attrId).name
    );

    this.componentService.getComponents().subscribe(
      c => this.components = c,
      e => this.handleError,
      () => this.component = this.components.find(c => c.id === this.componentId).name
    );
  }

  getCapabilityData() {
    this.capabilityService.getCapabilitiesByIntersection(this.attrId, this.componentId).subscribe(
      c => this.filteredCapabilities = this.capabilites = c,
      e => this.errorMessage = e,
      () => this.dataReady = true
    );
  }

  handleError(res: Response) {
    console.log('error', res.status, res.statusText);
  }
}
