import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnChanges {

  public active: Boolean = false;
  public totalPrice: number = 0;
  constructor() { }
  
  @Input() model;
  @Input() activeBilling;
  

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.active = this.activeBilling;
    this.totalPrice = this.model.reduce((a,b) => {return a + b.ChannelTotalCost},0)
  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
}

private closeForm(): void {
    this.active = false;
    this.cancel.emit();
}

public onSave(e): void {
 
  e.preventDefault();
    this.save.emit(this.model);
    this.active = false;
    this.closeForm();
}

}
