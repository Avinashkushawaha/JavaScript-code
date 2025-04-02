function hasCircularReferences(obj) {
    const seen = new WeakSet();
    
    function detect(obj) {
      if (typeof obj === 'object' && obj !== null) {
        if (seen.has(obj)) return true;
        seen.add(obj);
        
        for (const key in obj) {
          if (obj.hasOwnProperty(key) && detect(obj[key])) {
            return true;
          }
        }
      }
      return false;
    }
    
    return detect(obj);
  }
  
  // Example usage:
  const obj = { a: 1 };
  obj.b = obj;
  console.log(hasCircularReferences(obj)); // true