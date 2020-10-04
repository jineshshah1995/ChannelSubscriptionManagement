import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';

// Importing Service 
import { BackendService } from '../../../Services/backend.service';

import _ from 'lodash-es';

@Component({
  selector: 'app-channels-list',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.css']
})
export class ChannelsListComponent implements OnInit {

  public userName: string;
  public userSubscribedChannels = [];
  public bindingType: String = 'array';
  public view: Observable<GridDataResult>;
  public editDataItem: any;
  public isNew: Boolean = false;

  public allChannelsList: any;
  public displayAllChannels: any;
  public allChannelsColumnList = [];
  public userSubscribedChannelsList: any;
  public userOriginalSubscribedChannelsList: any;
  public displayUserSubChannels: any;
  public userSubscribedChannelsColumnList = [
    { field: 'ChannelID', title: "Channel No" },
    { field: 'ChannelName', title: "Channel Name" },
    { field: 'ChannelType', title: "Category" },
    { field: 'ChannelOperation', title: "Action" },
    { field: 'ChannelPrice', title: "Price per Day" },
    { field: 'ChannelSubDays', title: "Subscribed Days" },
    { field: 'ChannelTotalCost', title: "Total Cost" }];
  public userBillingDetailsList = [];
  public userBillingDetailsColumnList = [];
  public billingDetailsClicked: Boolean = false;
  public activeBilling = false;

  constructor(private backednSercvice: BackendService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('isAuthenticated');
    this.userName = this.userName.substring(1, this.userName.length - 1);
    this.getUsersSubscribedList(this.userName);
    this.getAllChannelsList();
  }


  // Get User Already Subscribed Channels
  getUsersSubscribedList(username: string) {
    this.backednSercvice.getUserSubscribedChannels(username)
      .subscribe(userSubcribedList => {
        if (userSubcribedList) {
          this.userSubscribedChannelsList = userSubcribedList['subscriptionInformation'];
          this.displayUserSubChannels = userSubcribedList['subscriptionInformation'];
        }
      }
      )
  }

  // Get All Channel List
  getAllChannelsList() {
    this.backednSercvice.getAllChannels()
      .subscribe(channelList => {
        // If Channel is Subscribed then it is not available in all channel list
        this.displayAllChannels = _.differenceWith(channelList, this.userSubscribedChannelsList, (v1, v2) => {
          return v1.ChannelID === v2.ChannelID
        });
        this.allChannelsList = this.displayAllChannels;
        this.allChannelsColumnList = Object.keys(this.allChannelsList[0]);
      })
  }

  addNewChannelBtnClicked() {
    this.activeBilling = false;
    this.isNew = true;
  }

  openDialogEditor(dataItem: any) {
  }

  cancelHandler() {
    this.activeBilling = false;
  }

  saveHandler(channels: any) {
    // Except Puase Action type we have to calculate the Bill
    if (this.isNew) {
      this.userBillingDetailsList.push(channels);
    } else {
      console.log(channels);
      if (channels.ChannelOperation !== 'Pause') {
        this.userBillingDetailsList.push(channels);
      } else {
        this.userSubscribedChannelsList.forEach(element => {
          if (element.ChannelID === channels.ChannelID) {
            element.ChannelOperation = channels.ChannelOperation;
            // reseting the value
            element.ChannelTotalCost = 0;
            element.ChannelSubDays = 0;

          }
        });
      }
    }
  }

  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }

  public saveBillingDetailsHandler(newlySubscribedChannels: any) {
    this.userSubscribedChannelsList = [...this.userSubscribedChannelsList, ...newlySubscribedChannels]
    newlySubscribedChannels.forEach(element => {
      this.allChannelsList = this.allChannelsList.filter(e => e.ChannelID !== element.ChannelID)
    });
    this.userBillingDetailsList = [];
  }

  public getUserBillingDetails(e) {
    this.activeBilling = true;
    console.log(this.userBillingDetailsList);
  }

  public saveAllChanges(e) {
    this.backednSercvice.saveUserSubscriptionDetails({ username: this.userName, subscriptionInformation: this.userSubscribedChannelsList })
      .subscribe(dataSaved => {
        if (dataSaved) alert('Data Saved Successfully!!!');
      });
  }
  public filterData(e) {
    if (e.target.value === "all") {
      this.displayAllChannels = this.allChannelsList;
      this.displayUserSubChannels = this.userSubscribedChannelsList;
    } else {
      this.displayUserSubChannels = this.userSubscribedChannelsList.filter(channels => channels.ChannelType.toLowerCase() === e.target.value.toLowerCase());
      this.displayAllChannels = this.allChannelsList.filter(channels => channels.ChannelType.toLowerCase() === e.target.value.toLowerCase())
    }
  }
}
