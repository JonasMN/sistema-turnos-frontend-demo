import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import FormField from "../../components/FormField/FormField.jsx";
import stylesCustom from "./AutoCompleteInput.module.scss";
import { useEffect } from "react";

const AutoCompleteInput = ({
  inputValue = "",
  variant = "form",
  variantSecondary,
  disabled,
  setAddress,
  children,
  styleContent = {},
  customCallback,
  reset,
  dataForm,
  valueDefault,
  label = "Dirección",
  className,
  ...props
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "initMap",
    requestOptions: {},
    debounce: 400,
  });

  // Check if user input is a valid "lat,lng"
  const isCoordinateInput = (input) => {
    const regex = /^\s*(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)\s*$/;
    return regex.test(input);
  };

  const buscadorCalleAltura = (stringDomicilio) => {
    const regex = /^(?=.[a-zA-Z])(?=.\d).+$/;
    return (
      stringDomicilio
        .split(",")
        .find((i) => regex.test(i))
        ?.trim()
        .split(/(\d+)/) || ["", ""]
    );
  };

  const handleInput = async (e) => {
    const input = e.target.value;
    setValue(input);

    // If user typed coordinates like "-34.60,-58.38"
    if (isCoordinateInput(input)) {
      const [latStr, lngStr] = input.split(",").map((s) => s.trim());
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      try {
        const results = await getGeocode({ location: { lat, lng } });
        const description = results[0].formatted_address;

        const components = results[0].address_components.reduce(
          (acc, component) => {
            const type = component.types[0];
            acc[type] = component.long_name || "";
            return acc;
          },
          {}
        );

        let calle = components["route"] || "";
        let altura = components["street_number"] || "";
        const codigo_postal = components["postal_code"] || "";
        const localidad = components["locality"] || "";
        const provincia = components["administrative_area_level_1"] || "";
        const pais = components["country"] || "";

        if (!calle || !altura) {
          const [newCalle, newAltura] = buscadorCalleAltura(description);
          calle = newCalle || "";
          altura = newAltura || "";
        }


        setAddress({
          place_id: results[0]?.place_id, 
          calle,
          numero: altura,
          piso: "",
          departamento: "",
          latitud: lat,
          longitud: lng,
          codigo_postal,
          localidad,
          provincia,
          pais,
          direccion_formateada: description,
        });;

        clearSuggestions();
      } catch (err) {
        console.error("Error reverse geocoding:", err);
      }
    }
  };

  const handleSelect =
    ({ description, place_id }) =>
    async () => {
      setValue(description, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address: description });
        const { lat, lng } = getLatLng(results[0]);

        const components = results[0].address_components.reduce(
          (acc, component) => {
            const type = component.types[0];
            acc[type] = component.long_name || "";
            return acc;
          },
          {}
        );

        let calle = components["route"] || "";
        let altura = components["street_number"] || "";
        const codigo_postal = components["postal_code"] || "";
        const localidad = components["locality"] || "";
        const provincia = components["administrative_area_level_1"] || "";
        const pais = components["country"] || "";

        if (!calle || !altura) {
          const [newCalle, newAltura] = buscadorCalleAltura(description);
          calle = newCalle || "";
          altura = newAltura || "";
        }

        setAddress({
          place_id, 
          calle,
          numero: altura,
          piso: "",
          departamento: "",
          latitud: lat,
          longitud: lng,
          codigo_postal,
          localidad,
          provincia,
          pais,
          direccion_formateada: description,
        });
      } catch (error) {
        console.error("Error fetching geocode:", error);
      }
    };

  useEffect(() => {
    setValue(inputValue, false);
  }, [inputValue]);

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className={stylesCustom.suggestionItem}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div
      className={`${stylesCustom[variant]} ${
        variantSecondary ? stylesCustom[variantSecondary] : ""
      } ${className}`}
      style={styleContent}
    >
      <div className={`${stylesCustom[variant + "-contentInput"]}`}>
        <FormField
          label="Dirección"
          name="direccion"
          value={value}
          onChange={handleInput}
          required={true}
          disabled={disabled}
          placeholder="Ingrese dirección"
          className={`${stylesCustom[variant + "-contentInput-input"]}`}
          {...props}
        />
        {status === "OK" && !isCoordinateInput(value) && (
          <ul className={stylesCustom.suggestionsList}>
            {renderSuggestions()}
          </ul>
        )}
        <div className={`${stylesCustom.mapContent} map-container}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteInput;
