import React, { useEffect, useState } from "react";
import {
  getProfile,
} from "../../Common/Services/ProfileService";

/* STATEFUL PARENT COMPONENT */
const ProfileList = () => {
  // Variables in the state to hold data
  const [profile, setProfile] = useState([]);


  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    getProfile().then((profile) => {
      console.log(profile);
      setProfile(profile);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
 
  return (
    <div>
      <hr />
      Profile:
      <div>
        {profile.length > 0 && (
          <ul>
            {profile.map((profile) => (
              <div>
                <span>
                  {/* Using getter for plant Object to display name */}
                  <li key={profile.id}>Name: {profile.get("firstName")} {profile.get("lastName")} <br />Bio: {profile.get("bio")}</li>{" "}
                  {/* Button with inline click handler to obtain 
                  instance of plant for remove state variable*/}
                </span>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
