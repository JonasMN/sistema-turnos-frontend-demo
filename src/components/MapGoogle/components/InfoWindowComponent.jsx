import { InfoWindow } from "@react-google-maps/api";

const InfoWindowComponent = ({ position, children, onClose }) => (
    <InfoWindow
        position={position}
        onCloseClick={() => onClose && onClose()}
        options={{
            pixelOffset: new window.google.maps.Size(0, -40),
        }}
    >
        <div>{children}</div>
    </InfoWindow>
);


export default InfoWindowComponent;
