import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addConnections,
  removeConnections,
} from "../utils/store/slices/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const connectionsRes = await axios.get(
        API_BASE_URL + "/user/connections",
        {
          withCredentials: true,
        },
      );
      console.log(connectionsRes.data.data);
      dispatch(addConnections(connectionsRes.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h2>No Connection Found!!</h2>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connectons</h1>
      {connections.map((conn) => {
        const { firstName, lastName, photoUrl, age, gender, about } = conn;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                src={photoUrl}
                alt="image"
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {(age || gender) && (
                <p>
                  {age}, {gender}
                </p>
              )}
              {about && <p>{about}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
