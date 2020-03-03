import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {JobService} from '../services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  job = {
    title: undefined,
    description: undefined,
    salary: undefined,
    technologies: undefined,
    userId: this.tokenStorageService.getUser().id
  };
  jobForm = this.formBuilder.group({
    title : ['', [ Validators.required]],
    technologies : ['', [ Validators.required]],
    description : ['', [ Validators.required, Validators.maxLength(200)]],
    salary : ''
  });

  isLoggedIn: boolean;
  private submitted: boolean;

  constructor(private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder,
              private jobService: JobService,
              private route: ActivatedRoute,
              private router: Router) {

  }
    ngOnInit()    {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (!this.isLoggedIn === true) {
        this.router.navigate(['login']);
      }
    }
  onSubmit() {
    const controls = this.jobForm.controls;
    if (this.jobForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    this.saveJob();
    if (this.submitted === true) {
      this.router.navigate(['home']);
    }
    }

  isControlInvalid(controlName: string): boolean {
    const control = this.jobForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  saveJob() {
    const data = {
      title: this.jobForm.value.title,
      description: this.jobForm.value.description,
      salary: this.jobForm.value.salary,
      technologies: this.jobForm.value.technologies,
      userId: this.tokenStorageService.getUser().id
    };

    this.jobService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

    this.submitted = true;
   }
}
