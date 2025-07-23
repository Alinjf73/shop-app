export function includeObj(obj, includesKey) {
  // includesKeu : [name ,  email ] => user (obj) => ["name" , "email" "mobile"]
  const newObj = {};
  Object.keys(obj)
    .filter((key) => includesKey.includes(key)) // ["name , email"]
    .forEach((key) => (newObj[key] = obj[key])); // {name : "saheb" , email : "user@gmail.com" }
  return newObj;
}

//  newObj["name"] = user["name"]
// newObj["email"] = user["email"]

// return new object with key and value
