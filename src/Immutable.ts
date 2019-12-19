import {
  isBlobObject,
  isError,
  isFileObject,
  isImmutable,
  isReactElement,
} from './utils';

interface IPrototype {
  prototype: {
    [key: string]: any;
  }
}

export type Immutable<T> = T & {

}

function Immutable<T extends { [key: string]: any }>(obj: T, options?: IPrototype, stackRemaining: number = 64) {
    if (isImmutable(obj) || isReactElement(obj) || isFileObject(obj) || isBlobObject(obj) || isError(obj)) {
      return obj;
    } else if (Promise && obj instanceof Promise) {
      return obj.then(Immutable);
    } else if (Array.isArray(obj)) {
      return makeImmutableArray(obj.slice());
    } else if (obj instanceof Date) {
      return makeImmutableDate(new Date(obj.getTime()));
    } else {
      // Don't freeze the object we were given; make a clone and use that.
      const prototype = options && options.prototype;
      const instantiateEmptyObject = (!prototype || prototype === Object.prototype)
          ? instantiatePlainObject :
          () => Object.create(prototype);
      var clone = instantiateEmptyObject();

      if (stackRemaining <= 0) {
        throw new ImmutableError("Attempt to construct Immutable from a deeply nested object was detected." +
          " Have you tried to wrap an object with circular references (e.g. React element)?" +
          " See https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected for details.");
      }

      for (var key in obj) {
        if (Object.getOwnPropertyDescriptor(obj, key)) {
          clone[key] = new Immutable(obj[key], undefined, stackRemaining - 1);
        }
      }

      return makeImmutableObject(clone);
    }
  }
}
