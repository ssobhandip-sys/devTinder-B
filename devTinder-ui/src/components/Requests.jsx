import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequest } from "../utils/store/slices/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const requestsRes = await axios.get(
        API_BASE_URL + "/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addRequests(requestsRes?.data?.data));
    } catch (err) {}
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        API_BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id))
    } catch (err) {
        console.error(err)
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) return <h2 className="flex justify-center my-10">No Request Found!!</h2>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connectons</h1>
      {requests.map((req) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          req.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
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
            <div>
              <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",req._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",req._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
