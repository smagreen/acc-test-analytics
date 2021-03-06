import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IComponent } from '../../model/capability.model';
import { ComponentService } from '../component.service';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  components: IComponent[]= [];
  dataReady = false;

  constructor(private service: ComponentService) { }

  ngOnInit() {
    this.subscription = this.service.getComponents().subscribe(
        components => this.components = components,
        e => console.log('onError %s', e),
        () => { this.dataReady = true; }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editComponent(comp: IEditableComponent) {
    comp.editEnabled = !comp.editEnabled;
  }
}

export interface IEditableComponent extends IComponent {
  editEnabled: Boolean;
}
