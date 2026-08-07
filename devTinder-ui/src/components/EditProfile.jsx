import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/slices/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastname] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const saveProfileRes = await axios.patch(
        API_BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(saveProfile?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card card-border bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset my-2">
                  <label className="label" htmlFor="name">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    id="name"
                    className="input"
                    placeholder="Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <label className="label" htmlFor="name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    id="name"
                    className="input"
                    placeholder="Name"
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <label className="label" htmlFor="name">
                    Photo Url
                  </label>
                  <input
                    type="text"
                    value={photoUrl}
                    id="name"
                    className="input"
                    placeholder="Name"
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <label className="label" htmlFor="name">
                    Age
                  </label>
                  <input
                    type="text"
                    value={age}
                    id="name"
                    className="input"
                    placeholder="Name"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <label className="label" htmlFor="name">
                    Gender
                  </label>
                  <input
                    type="text"
                    value={gender}
                    id="name"
                    className="input"
                    placeholder="Name"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <label className="label" htmlFor="name">
                    About
                  </label>
                  <input
                    type="text"
                    value={about}
                    id="name"
                    className="input"
                    placeholder="Name"
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
