import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new plant with Name
export const createPlant = (Name) => {
  console.log("Creating: ", Name);
  const Plant = Parse.Object.extend("Plant");
  const plant = new Plant();
  // using setter to UPDATE the object
  plant.set("name", Name);
  return plant.save().then((result) => {
    // Print the result's name to console log
    console.log(result.get("name"));
    // returns new Plant object
    return result;
  });
};

// READ operation - get plant by ID
export const getById = (id) => {
  const Plant = Parse.Object.extend("Plant");
  const query = new Parse.Query(Plant);
  return query.get(id).then((result) => {
    // return Plant object with objectId: id
    return result;
  });
};

// READ operation - get all plants in Parse class Plant
export const getAllPlants = () => {
  const Plant = Parse.Object.extend("Plant");
  const query = new Parse.Query(Plant);
  return query.find().then((results) => {
    // returns array of Plant objects
    return results;
  });
};

// DELETE operation - remove plant by ID
export const removePlant = (id) => {
  const Plant = Parse.Object.extend("Plant");
  const query = new Parse.Query(Plant);
  return query.get(id).then((plant) => {
    plant.destroy();
  });
};
