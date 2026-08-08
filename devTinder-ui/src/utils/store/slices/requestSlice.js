import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "reqests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest:(state,action)=>{
        const newReqArr=state.filter((r)=>r._id!==action.payload);
        return newReqArr;
    }
  },
});

export const {addRequests,removeRequest}=requestSlice.actions;

export default requestSlice.reducer;
