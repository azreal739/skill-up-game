import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageKey, LocalStorageService } from 'src/services/LocalStorageService';

/** Key used by an earlier version of this component; migrated on load. */
const LEGACY_STORAGE_KEY = 'resolutions';

@Component({
  standalone: true,
  selector: 'app-resolutions',
  templateUrl: './resolutions.component.html',
  styleUrls: ['./resolutions.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ResolutionsComponent implements OnInit {
  resolutions: string[] = [];
  newResolution = '';
  editingIndex: number | null = null;

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit() {
    const stored = this._localStorageService.get<string[]>(LocalStorageKey.resolutions);
    if (stored) {
      this.resolutions = stored;
      return;
    }

    // One-time migration from the old raw key so existing data isn't lost.
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      try {
        this.resolutions = JSON.parse(legacy);
        this.saveResolutions();
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    }
  }

  get isEditing(): boolean {
    return this.editingIndex !== null;
  }

  saveResolution() {
    const text = this.newResolution.trim();
    if (!text) {
      return;
    }

    if (this.editingIndex !== null) {
      this.resolutions[this.editingIndex] = text;
      this.editingIndex = null;
    } else {
      this.resolutions.push(text);
    }
    this.saveResolutions();
    this.newResolution = '';
  }

  editResolution(index: number) {
    this.newResolution = this.resolutions[index];
    this.editingIndex = index;
  }

  cancelEdit() {
    this.editingIndex = null;
    this.newResolution = '';
  }

  deleteResolution(index: number) {
    this.resolutions.splice(index, 1);
    if (this.editingIndex === index) {
      this.cancelEdit();
    } else if (this.editingIndex !== null && this.editingIndex > index) {
      this.editingIndex--;
    }
    this.saveResolutions();
  }

  clearResolutions() {
    this.resolutions = [];
    this.cancelEdit();
    this.saveResolutions();
  }

  private saveResolutions() {
    this._localStorageService.set(LocalStorageKey.resolutions, this.resolutions);
  }
}
