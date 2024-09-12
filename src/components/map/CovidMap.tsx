import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppSelector } from "@/store/hooks";
import stateCoordinates from "../../statecordinates.json";

const CovidMap = () => {
  const data = useAppSelector(
    (state) => state.covid.fetchedData?.data.regional
  );

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stateCoordinates.map((state) => {
        const stateData = data?.find((data) => data.loc === state.state);
        return (
          <Marker
            key={state.state}
            position={[state.latitude, state.longitude]}
          >
            <Popup>
              <strong>{state.state}</strong>
              <br />
              Total : {stateData?.totalConfirmed} <br />
              Deaths : {stateData?.deaths} <br />
              Recovered: {stateData?.discharged} <br />
              Active :
              {stateData
                ? stateData.totalConfirmed -
                  (stateData.deaths + stateData.discharged)
                : "N/A"}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default CovidMap;
