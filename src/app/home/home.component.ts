import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import {TokenStorageService} from '../services/token-storage.service';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  jobs: any;
  title = '';
  panelOpenState: boolean;
  searchForm = this.formBuilder.group({
    searchQuery : new FormControl()
    });



  constructor(private jobService: JobService,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.retrieveJobs();
  }

  retrieveJobs() {
    this.jobService.getAll()
      .subscribe(
        data => {
          this.jobs = data;

          this.jobs = this.jobs.slice().reverse();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  removeAllJobs() {
    this.jobService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveJobs();
        },
        error => {
          console.log(error);
        });
  }

  findByTags() {
    if ( !this.searchForm.value.searchQuery || !this.searchForm.value.searchQuery.trim()) {
      this.retrieveJobs();
      return;
    }
    this.jobService.findByTags(this.searchForm.value.searchQuery)
      .subscribe(
        data => {
          this.jobs = data;
          this.jobs = this.jobs.slice().reverse();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
