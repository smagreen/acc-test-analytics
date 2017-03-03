import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IAttribute } from '../../model/capability.model';
import { AttributeService } from '../attribute.service';
import { ErrorService } from '../../errors/error.service';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit, OnDestroy {
subscription: Subscription;
attributes: IAttribute[] = [];
dataReady: Boolean  = false;

  constructor(private service: AttributeService, private errorService: ErrorService) { }

  ngOnInit() {
    console.log('init');
    this.subscription = this.service.getAttributes().subscribe(
        data => this.attributes = data,
        e => this.errorService.handleError(e, 'attribute-list.component'),
        () => this.dataReady = true
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editAttribute(attr: IEditableAttribute) {
    attr.editEnabled = !attr.editEnabled;
  }
}

export interface IEditableAttribute extends IAttribute {
  editEnabled: Boolean;
}
