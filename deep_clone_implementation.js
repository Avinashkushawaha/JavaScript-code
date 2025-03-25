function deepClone(obj, hash = new WeakMap()) {
  if (Object(obj) !== obj) return obj; 
  if (hash.has(obj)) return hash.get(obj); 
  
  const clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);

    for (let key in obj) {
        if (Object.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], hash);
        }
    }
    return clone;
}

const original = {a : 1 };
original.self = original;
const cloned = deepClone(original);
console.log(cloned.self === cloned); 