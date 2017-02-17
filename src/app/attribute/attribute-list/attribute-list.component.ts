import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IAttribute } from '../../shared/index';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit, OnDestroy {
subscription: Subscription;
attributes: IAttribute[] = [];
dataReady: Boolean  = false;

  constructor(private service: AttributeService) { }

    ngOnInit() {
    this.subscription = this.service.getAttributes().subscribe(
        attrs => this.attributes = attrs,
        e => console.log('onError %s', e),
        () => { this.dataReady = true; }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editAttribute(attr: IEditableAttribute) {
    attr.editEnabled = !attr.editEnabled;
    console.log('Attribute edit clicked: ', attr.id);
  }
}

export interface IEditableAttribute extends IAttribute {
  editEnabled: Boolean;
}
