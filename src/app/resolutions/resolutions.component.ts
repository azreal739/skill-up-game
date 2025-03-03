import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-resolutions',
  templateUrl: './resolutions.component.html',
  styleUrls: ['./resolutions.component.scss'],
  imports: [ CommonModule, FormsModule ],
})
export class ResolutionsComponent implements OnInit {
  resolutions: string[] = [];
  newResolution: string = '';
  editingIndex: number | null = null;

  ngOnInit() {
    const storedResolutions = localStorage.getItem('resolutions');
    if (storedResolutions) {
      this.resolutions = JSON.parse(storedResolutions);
    }
  }

  addResolution() {
    if (this.newResolution.trim()) {
      this.resolutions.push(this.newResolution);
      this.saveResolutions();
      this.newResolution = '';
    }
  }

  deleteResolution(index: number) {
    this.resolutions.splice(index, 1);
    this.saveResolutions();
  }

  clearResolutions() {
    this.resolutions = [];
    this.saveResolutions();
  }

  editResolution(index: number) {
    this.newResolution = this.resolutions[index];
    this.editingIndex = index;
  }

  private saveResolutions() {
    localStorage.setItem('resolutions', JSON.stringify(this.resolutions));
  }
}