import React, { useEffect, useState } from "react";
import {
  getAllPlants,
  getById,
  createPlant,
  removePlant
} from "../../Common/Services/PlantService";

/* STATEFUL PARENT COMPONENT */
const PublicPlantList = () => {
  // Variables in the state to hold data
  const [plants, setPlants] = useState([]);
  const [plant, setPlant] = useState([]);
  const [name, setName] = useState();

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    // Need to figure out how to specify what id it is by what plant the user clicks on
    getById().then((plants) => {
      console.log(plants);
      setPlants(plants);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
 
  // Handler to handle event passed from child submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    // Trigger add flag to create plant and
    // re-render list with new plant
    setAdd(true);
  };

  // Handler to track changes to the child input text
  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // Continuously updating name to be added on submit
    setName(e.target.value);
  };

  return (
    <div>
      <hr />
      List of Plants:
      <div>
        {plants.length > 0 && (
          <ul>
            {plants.map((plant, index) => (
              <div>
                <span>
                  {/* Using getter for plant Object to display name */}
                  <li key={`${plant.id}-${index}`}>{plant.get("name")}</li>{" "}
                  {/* Button with inline click handler to obtain 
                  instance of plant for remove state variable*/}
                </span>
              </div>
            ))}
          </ul>
        )}
      </div>
      <div>
        <p> Plant by ID: </p>
        {/* Check that the plant object exists */}
        {Object.keys(plant).length > 0 && (
          <ul>
            {/* Using getter for plant Object to display name */}
            {plants.map((plant) => (
              <li key={"1" + plant.id}> {plant.id} </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PublicPlantList;