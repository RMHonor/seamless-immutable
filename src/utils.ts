// https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L21
const REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element');
const REACT_ELEMENT_TYPE_FALLBACK = 0xeac7;

// Returns true if object is a valid react element
// https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L326
export function isReactElement(obj: IReactObject) {
  return typeof obj === 'object' &&
          obj !== null &&
          (obj.$$typeof === REACT_ELEMENT_TYPE_FALLBACK || obj.$$typeof === REACT_ELEMENT_TYPE);
}

export function isFileObject(obj: IAnyObject) {
  return File && obj instanceof File;
}

export function isBlobObject(obj: object) {
  return Blob && obj instanceof Blob;
}

export function isError(obj: object): boolean {
  return obj instanceof Error;
}

export function isImmutable(target) {
  if (typeof target === "object") {
    return target === null || Boolean(
      Object.getOwnPropertyDescriptor(target, immutabilityTag)
    );
  } else {
    // In JavaScript, only objects are even potentially mutable.
    // strings, numbers, null, and undefined are all naturally immutable.
    return true;
  }
}
