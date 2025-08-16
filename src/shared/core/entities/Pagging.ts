import { DomainError } from "./DomainError";

export class Pagging {
  private _totalPages!: number;

  constructor(
    private _totalItems: number,
    private _pageSize: number,
    private _currentPage: number
  ) {
    this.validate();
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  private validate() {
    if (!Number.isInteger(this._totalItems)) {
      throw new DomainError("invalid_value", "Total items must be an integer.");
    }

    if (this._totalItems < 0) {
      throw new DomainError(
        "invalid_value",
        "Total items must not be negative."
      );
    }

    if (this._pageSize < 1) {
      throw new DomainError("invalid_value", "Page size must be positive.");
    }

    if (!Number.isInteger(this._pageSize)) {
      throw new DomainError("invalid_value", "Page size must be an integer.");
    }

    this._totalPages = Math.max(
      Math.ceil(this._totalItems / this._pageSize),
      1
    );

    if (!Number.isInteger(this._currentPage)) {
      throw new DomainError(
        "invalid_value",
        "Current page must be an integer."
      );
    }

    if (this._currentPage < 1 || this._currentPage > this._totalPages) {
      throw new DomainError(
        "invalid_value",
        `Page must be between 1 and ${this._totalPages}.`
      );
    }
  }

  getItemsSlicingInterval(): PaggingItemsInterval {
    const startInterval = (this._currentPage - 1) * this._pageSize;
    const endInterval = startInterval + this._pageSize;
    return new PaggingItemsInterval(startInterval, endInterval);
  }
}

export class PaggingItemsInterval {
  constructor(private _start: number, private _end: number) {
    this.validate();
  }

  get start(): number {
    return this._start;
  }

  get end(): number {
    return this._end;
  }

  private validate() {
    if (!Number.isInteger(this._start)) {
      throw new DomainError(
        "invalid_value",
        "Pagging start items interval must be an integer."
      );
    }

    if (!Number.isInteger(this._end)) {
      throw new DomainError(
        "invalid_value",
        "Pagging end items interval must be an integer."
      );
    }

    if (this._start >= this._end) {
      throw new DomainError(
        "invalid_value",
        "Pagging start items interval should be less than the page end items interval."
      );
    }
  }
}
