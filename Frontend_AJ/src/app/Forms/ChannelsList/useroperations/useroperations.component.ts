import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-useroperations',
  templateUrl: './useroperations.component.html',
  styleUrls: ['./useroperations.component.css']
})
export class UseroperationsComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }

  public active = false;
  public range = { start: null, end: null };

  Operation: any = ['Extend','Pause','Resume'];
  showDatePicker: Boolean = true;
  minDate: any;

    public editForm: FormGroup = new FormGroup({
        'ChannelID': new FormControl(),
        'ChannelName': new FormControl('{disabled: true}'),
        'ChannelPrice': new FormControl({disabled: true}),
        'ChannelType': new FormControl(''),
        'ChannelOperation': new FormControl(''),
        'ChannelSubFromDate': new FormControl(0),
        'ChannelSubToDate': new FormControl(0),
        'ChannelTotalCost': new FormControl(0),
        'ChannelSubDays': new FormControl(0),
    });

    @Input() public isNew = Boolean;

    @Input() public set model(channelDetails: any) {
      console.log(channelDetails);
      
      if(channelDetails && channelDetails.ChannelSubFromDate && channelDetails.ChannelSubToDate){
        channelDetails.ChannelSubFromDate  = new Date(channelDetails.ChannelSubFromDate);
        channelDetails.ChannelSubToDate  = new Date(channelDetails.ChannelSubToDate);
      }
        this.editForm.reset(channelDetails);
        this.active = channelDetails !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();

    
    public onSave(e): void {
      if(this.showDatePicker){

      // Calculating Days and Cost
      let diff_in_time = (this.editForm.get('ChannelSubToDate').value).getTime()-(this.editForm.get('ChannelSubFromDate').value).getTime();
      let diff_in_days =  diff_in_time / ( 1000 * 3600 * 24);
      this.editForm.get('ChannelSubDays').setValue(diff_in_days)
      this.editForm.get('ChannelTotalCost').setValue(diff_in_days * this.editForm.get('ChannelPrice').value);
      
      // Date Fromating using luxon
      let ChannelSubToDateDate = JSON.stringify(this.editForm.get('ChannelSubToDate').value);
      ChannelSubToDateDate = ChannelSubToDateDate.substring(1,ChannelSubToDateDate.length-1);

      let ChannelSubFromDateDate = JSON.stringify(this.editForm.get('ChannelSubFromDate').value);
      ChannelSubFromDateDate = ChannelSubFromDateDate.substring(1,ChannelSubFromDateDate.length-1);
    }
      e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }

    changeCity(e) {
     if(this.editForm.get('ChannelOperation').value !== 'Pause')
        this.showDatePicker = true;
      else {
          this.showDatePicker = false;
        }
    }
    


}
