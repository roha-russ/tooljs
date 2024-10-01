
export class Result<T> {
  private _value: T|Error = new Error('No value');

  static ok<T>(value: T): Result<T> {
    const result = new Result<T>();
    result._value = value;
    return result;
  }

  static err(error: Error): Result<never> {
    const result = new Result<never>();
    result._value = error;
    return result;
  }

  isOk(): boolean {
    return !(this._value instanceof Error);
  }

  isErr(): boolean {
    return this._value instanceof Error;
  }

  unwrap(): T {
    if (this._value instanceof Error) {
      throw this._value;
    }
    return this._value;
  }

  unwrapOr(defaultValue: T): T {
    if (this._value instanceof Error) {
      return defaultValue;
    }
    return this._value;
  }

  unwrapOrNone(): T|undefined {
    if (this._value instanceof Error) {
      return undefined;
    }
    return this._value;
  }

  unwrapErr(): Error {
    if (this._value instanceof Error) {
      return this._value;
    }
    throw new Error('No error');
  }

  unwrapErrOr(defaultError: Error): Error {
    if (this._value instanceof Error) {
      return this._value;
    }
    return defaultError;
  }

  unwrapErrOrNone(): Error|undefined {
    if (this._value instanceof Error) {
      return this._value;
    }
    return undefined;
  }
}

export function tryCatch<T>(fn: () => T): Result<T> {
  try {
    return Result.ok(fn());
  } catch (error) {
    if (error instanceof Error) {
      return Result.err(error);
    }

    return Result.err(new Error('Unknown error: ' + error));
  }
}