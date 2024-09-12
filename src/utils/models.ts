export interface Summary {
  total: number;
  discharged: number;
  deaths: number;
}

export interface Regional {
  loc: string;
  discharged: number;
  deaths: number;
  totalConfirmed: number;
}

export interface CovidApiResponse {
  data: {
    summary: Summary;
    regional: Regional[];
  };
}
