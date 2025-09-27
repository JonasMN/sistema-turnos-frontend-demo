import { OverlayView } from "@react-google-maps/api";

const CustomMarker = ({ position, onClick, id }) => (
    <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
        <div
            id={id} // Agrega el id aquí
            data-id={id} // Atributo personalizado para referencia adicional
            style={{ transform: 'translate(-50%, -100%)', position: 'absolute' }}
            onClick={onClick}
        >
            <i
                className="bi bi-truck"
                style={{
                    fontSize: '16px',
                    color: 'var(--white)',
                    backgroundColor: 'var(--blue)',
                    borderRadius: '50%',
                    padding: '9px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
            ></i>
        </div>
    </OverlayView>
);


export default CustomMarker;
