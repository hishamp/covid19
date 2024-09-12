import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CovidApiResponse, Regional } from "../utils/models";

// fetching initial covid data using api
export const fetchData = createAsyncThunk<CovidApiResponse>(
  "data/fetch",
  async () => {
    const response = await axios.get(
      "https://api.rootnet.in/covid19-in/stats/latest"
    );
    console.log(response.data);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  }
);

type CovidInitState = {
  summary: {
    deaths: number;
    recovered: number;
    active: number;
    total: number;
  };
  loading: boolean;
  statesList: string[];
  fetchedData: CovidApiResponse | undefined;
};

const initialState: CovidInitState = {
  summary: {
    active: 0,
    recovered: 0,
    deaths: 0,
    total: 0,
  },
  loading: false,
  statesList: [],
  fetchedData: undefined,
};

const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {
    // reducer to get covid data based on states
    getStateData: (state, action: PayloadAction<string>) => {
      if (action.payload === "all") {
        const summary = state.fetchedData?.data.summary;
        state.summary = {
          active: summary!.total - (summary!.deaths + summary!.discharged), // calculated active case by subtracting discharged and deaths from total cases 
          total: summary!.total,
          recovered: summary!.discharged,
          deaths: summary!.deaths,
        };
      } else {
        const regionalData = state.fetchedData?.data.regional;
        const stateData = regionalData?.find(
          (item) => item.loc === action.payload
        );
        if (stateData) {
          const { deaths, discharged, totalConfirmed } = stateData;
          state.summary = {
            active: totalConfirmed - (discharged + deaths), // calculated active cases by subtracting discharged and deaths from total cases 
            deaths: deaths,
            recovered: discharged,
            total: totalConfirmed,
          };
        }
      }
    },
  },
  extraReducers(builder) {       // extra reducer helps with async thunk functions where we can call async functions and update states
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchedData = action.payload;
      console.log("fetch", action.payload);
      const regionalData: Regional[] = action.payload.data.regional;
      const states = regionalData.map((item) => item.loc);  // get all the state names from the api
      state.statesList = states;  
      const { deaths, discharged, total } = action.payload.data.summary;
      state.summary = {
        deaths: deaths,
        recovered: discharged,
        total: total,
        active: total - (deaths + discharged),
      };
    });
  },
});

export const { getStateData } = covidSlice.actions;

export default covidSlice;
