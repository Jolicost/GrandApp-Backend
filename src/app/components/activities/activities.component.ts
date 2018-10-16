import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities = [];

  constructor(
    private dialogService: DialogService,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.activities = this.activitiesService.getActivities();
  }

  openModal(mode) {
    this.dialogService.openDialog(mode);
  }
}
