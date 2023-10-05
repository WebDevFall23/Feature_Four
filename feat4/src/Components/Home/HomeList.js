import React, { useEffect, useState } from "react";
import {
  getAllPlants,
  getById,
  createPlant,
  removePlant
} from "/src/Common/Services/PlantService";
import HomeForm from "./HomeForm";

/* STATEFUL PARENT COMPONENT */
const HomeList = () => {
  // Variables in the state to hold data
  const [plants, setPlants] = useState([]);
  const [plant, setPlant] = useState([]);
  const [name, setName] = useState();

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    getAllPlants().then((plants) => {
      console.log(plants);
      setPlants(plants);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState("");

  // UseEffect that runs when changes
  // are made to the state variables/flags
  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (name && add) {
      createPlant(name).then((newPlant) => {
        setAdd(false);
        console.log("Creating a new plant(in HomeList.js");
        // Add the newly created plant to the plants array
        setPlants([...plants, newPlant]);
      });
    }

    // Check if remove state variable is holding an ID
    if (remove.length > 0) {
      //Filter the old plants list to take out selected plant
      const newPlant = plants.filter((plant) => plant.id !== remove);
      setPlants(newPlant);

      removePlant(remove).then(() => {
        console.log("Removed plant with ID: ", remove);
      });
      // Reset remove state variable
      setRemove("");
    }
  }, [name, plants, add, remove]);

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
            {plants.map((plant) => (
              <div>
                <span>
                  {/* Using getter for plant Object to display name */}
                  <li key={plant.id}>{plant.get("name")}</li>{" "}
                  {/* Button with inline click handler to obtain 
                  instance of plant for remove state variable*/}
                  <button
                    onClick={(e) => {
                      // Set remove variable and trigger re-render
                      setRemove(plant.id);
                    }}
                  >
                    Delete
                  </button>
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
      {/* Stateless Child component passing up events from form */}
      <MainForm onClick={onClickHandler} onChange={onChangeHandler} />
    </div>
  );
};

export default HomeList;
