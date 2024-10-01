
export class Option<T> {
  private _value: T|undefined;

  private constructor() {}

  static some<T>(value: T): Option<T> {
    const option = new Option<T>();
    option._value = value;
    return option;
  }

  static none<T>(): Option<T> {
    return new Option<T>();
  }

  isSome(): boolean {
    return this._value !== undefined;
  }

  isNone(): boolean {
    return this._value === undefined;
  }

  unwrap(): T {
    if (this._value === undefined) {
      throw new Error('No value');
    }
    return this._value;
  }

  unwrapOr(defaultValue: T): T {
    if (this._value === undefined) {
      return defaultValue;
    }
    return this._value;
  }

  unwrapOrNone(): T|undefined {
    if (this._value === undefined) {
      return undefined;
    }
    return this._value;
  }
}