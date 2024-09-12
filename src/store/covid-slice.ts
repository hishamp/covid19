import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk<CovidApiResponse>("data/fetch", async () => {
  const response = await axios.get(
    "https://api.rootnet.in/covid19-in/stats/latest"
  );
  console.log(response.data);
  if (response.status === 200 && response.data) {
    return response.data;
  }
});

interface Summary {
  total: number;
  discharged: number;
  deaths: number;
}

interface Regional {
  loc: string;
  discharged: number;
  deaths: number;
  totalConfirmed: number;
}

interface CovidApiResponse {
  data: {
    summary: Summary;
    regional: Regional[];
  };
}

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
    deaths: 0,
    recovered: 0,
    active: 0,
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
    getStateData: (state, action: PayloadAction<string>) => {
      if (action.payload === "all") {
        const summary = state.fetchedData?.data.summary;
        state.summary = {
          active: summary!.total - (summary!.deaths + summary!.discharged),
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
          state.summary = {
            active:
              stateData.totalConfirmed -
              (stateData.discharged + stateData.deaths),
            deaths: stateData.deaths,
            recovered: stateData.discharged,
            total: stateData.totalConfirmed,
          };
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchedData = action.payload;
      console.log("fetch", action.payload);
      const regionalData: Regional[] = action.payload.data.regional;
      const states = regionalData.map((item) => item.loc);
      state.statesList = states;
      const summary = action.payload.data.summary;
      state.summary = {
        deaths: summary.deaths,
        recovered: summary.discharged,
        total: summary.total,
        active: summary.total - (summary.deaths + summary.discharged),
      };
    });
  },
});

export const { getStateData } = covidSlice.actions;

export default covidSlice;
