import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  // Retrieve all Jobs
  public  get() {
    return this.http.get(`${baseUrl}`);
  }

  // Create a new Job
  public  create(data) {
    return this.http.post(baseUrl, data);
  }

  // Update a Job with id
  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // Delete a Job with id
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // Delete all jobs
  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
  // Find Jobs By Tags
  findByTags(technologies) {

    return this.http.get(`${baseUrl}/tags/${technologies.toLowerCase()}`);
  }

  // Retrieve all Jobs
  getAll() {
    return this.http.get(baseUrl);
  }
}
