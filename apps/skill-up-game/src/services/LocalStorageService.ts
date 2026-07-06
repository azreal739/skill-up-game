import { Injectable } from '@angular/core';

export enum LocalStorageKey {
    blackJackHistory = 'BlackJack:blackJackHistory',
    chessGameState = 'Chess:gameState',
    chessGameHistory = 'Chess:gameHistory',
    whiteCaptures = 'Chess:whiteCaptures',
    blackCaptures = 'Chess:blackCaptures',
    resolutions = 'NewYears:resolutions',
    ticTacToeGameHistory = 'TicTacToe:winnerHistory',
    signedUpUser = 'Auth:signedUpUser',
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * Stores a value in local storage.
   * @param key The key under which the value is stored.
   * @param value The value to store.
   */
  set(key: LocalStorageKey, value: unknown): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  /**
   * Retrieves a value from local storage.
   * @param key The key corresponding to the stored value.
   * @returns The parsed value or null if not found.
   */
  get<T>(key: LocalStorageKey): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue !== null ? JSON.parse(serializedValue) as T : null;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return null;
    }
  }

  /**
   * Removes an item from local storage.
   * @param key The key corresponding to the item to remove.
   */
  remove(key: LocalStorageKey): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from local storage', error);
    }
  }

  /**
   * Clears all items from local storage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing local storage', error);
    }
  }
}
