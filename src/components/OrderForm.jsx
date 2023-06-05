import React, { lazy, useState } from "react";
import axios from "axios";
import {
  addDataToMockAPI,
  calculateShippingCost,
  getDistance,
  getInternational,
  getdestinationDate,
} from "../fakeApi";
import { useEffect } from "react";
import { Container } from "./SharedLayout.styled";
import { useNavigate } from "react-router-dom";
import { Title } from "./OrderForm.styled";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import {
  ButtonsContainer,
  Form,
  FormRow,
  TextButton,
  Input,
  Label,
  LinkButton,
  SubmitButton,
  SuggestionsList,
} from "./OrderForm.styled";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const ShipmentBlock = lazy(() => import("./ShipmentBlock"));
const MapWithRoute = lazy(() => import("./MapWithRoute"));
const OrderForm = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [weight, setWeight] = useState(50);
  const [originDate, setOriginDate] = useState(currentDate);
  const [destinationDate, setDestinationDate] = useState(currentDate);
  const [originRoute, setOriginRoute] = useState(null);
  const [destinationRoute, setdDestinationRoute] = useState(null);
  const [suggestedOrigins, setSuggestedOrigins] = useState([]);
  const [suggestedDestinations, setSuggestedDestinations] = useState([]);
  const [cost, setCost] = useState(0);
  const [distance, setDistance] = useState(0);
  const [createElement, setCreateElement] = useState(null);
  const [shipment, setShipment] = useState(null);
  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [originFlag, setOriginFlag] = useState(false);
  const [destinationFlag, setoDestinationFlag] = useState(false);
  const [originCityError, setOriginCityError] = useState("");
  const [destinationCityError, setDestinationCityError] = useState("");
  const [clientError, setClientError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [save, setSave] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateForm = () => {
    let isValid = true;

    // Validate origin city
    if (originCity.trim() === "" || originCityError) {
      setOriginCityError(
        "Необхідно вказати та вибрати правильний початковий пункт"
      );
      isValid = false;
    } else {
      setOriginCityError("");
    }

    // Validate destination city
    if (destinationCity.trim() === "" || destinationCityError) {
      setDestinationCityError(
        "Необхідно вказати та вибрати правильний  кінцевий пункт"
      );
      isValid = false;
    } else {
      setDestinationCityError("");
    }

    // Validate client
    if (client.trim() === "") {
      setClientError("Необхідно вказати ім’я клієнта");
      isValid = false;
    } else {
      setClientError("");
    }
    // Validate email
    if (email.trim() === "" || emailError) {
      setEmailError("Необхідно вказати вашу електронну пошту");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleOriginCityChange = async (event) => {
    const value = event.target.value;
    setOriginCity(value);

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          value
        )}&key=4b6e7d31f0654074aa698fd64a45063c`
      );
      const suggestions = response.data.results;
      !suggestions[0]
        ? setOriginCityError("Не можливо знайти місто")
        : setOriginCityError("");
      setSuggestedOrigins(suggestions);
      setOriginFlag(false);
    } catch (error) {
      console.log("Помилка запиту геокодування:", error.message);
      setSuggestedOrigins([]);
      setOriginCityError(
        "Необхідно вказати та вибрати правильний початковий пункт"
      );
    }
  };

  const handleDestinationCityChange = async (event) => {
    const value = event.currentTarget.value;
    setDestinationCity(value);

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          value
        )}&key=4b6e7d31f0654074aa698fd64a45063c`
      );
      const suggestions = response.data.results;
      !suggestions[0]
        ? setDestinationCityError("Не можливо знайти місто")
        : setDestinationCityError("");
      setSuggestedDestinations(suggestions);
      setoDestinationFlag(false);
    } catch (error) {
      console.log("Помилка запиту геокодування:", error.message);
      setSuggestedDestinations([]);
      setDestinationCityError(
        "Необхідно вказати та вибрати правильний кінцевий пункт"
      );
    }
  };

  const handleSuggestionOriginSelected = (suggestion) => {
    if (suggestion.components) {
      const { city, country } = suggestion.components;
      setOriginCity(city);
      setOriginCountry(country);
      setOriginRoute(suggestion.geometry);
      setOriginFlag(true);
    }
    setSuggestedOrigins([]);
  };
  const handleSuggestionDestinationSelected = (suggestion) => {
    if (suggestion.components) {
      const { city, country } = suggestion.components;

      setDestinationCity(city);
      setDestinationCountry(country);
      setoDestinationFlag(true);
      setdDestinationRoute(suggestion.geometry);
    }
    setSuggestedDestinations([]);
  };

  const handleOriginDateChange = (event) => {
    const value = event.target.value;
    setOriginDate(value);
  };
  const handleClientChange = (event) => {
    const value = event.target.value;
    setClient(value);
    setClientError("");
  };
  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value);
  };
  const handleEmailChange = (e) => {
    if (isValidEmail(e.target.value) || !e.target.value) {
      setEmailError("");
    } else {
      setEmailError("Неправильний формат електронної пошти");
    }
    setEmail(e.target.value);
  };

  useEffect(() => {
    //Отримуємо відстань у кілометрах
    if (originFlag && destinationFlag && weight !== 0) {
      const newDistance = getDistance(originRoute, destinationRoute);
      const newDestinationDate = getdestinationDate(newDistance, originDate);

      const shippingCost = calculateShippingCost(
        newDistance,
        weight,
        10,
        getInternational(originCity, destinationCity)
      );

      setDistance(newDistance);
      setCost(shippingCost);
      setDestinationDate(newDestinationDate);
    }
  }, [
    originDate,
    originCity,
    destinationCity,
    originRoute,
    destinationRoute,
    originFlag,
    destinationFlag,
    weight,
  ]);
  useEffect(() => {
    if (shipment && save) {
      navigate(`/payment/${shipment.idd}`);
      setSave(false);
      setShipment(null);
      setCreateElement(false);
      toast.success("Перехід до оплати замовлення!", {
        position: toast.POSITION.TOP_RIGHT, // Встановлення позиції Toast
        autoClose: 3000, // Автоматичне закриття через 3 секунди
        hideProgressBar: true, // Відображення прогрес-бару
        closeOnClick: true, // Закриття Toast при кліку
        pauseOnHover: true, // Пауза при наведенні курсору
        draggable: true, // Можливість перетягування Toast
      });
    }
  }, [shipment, navigate, save]);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Створення нового об'єкта з введеними даними
      const newOrder = {
        idd: nanoid(),
        shipmentNum: originCity[0] + destinationCity[0] + distance + client[0],
        originCity: originCity.toString(),
        originCountry: originCountry.toString(),

        destinationCity: destinationCity.toString(),
        destinationCountry: destinationCountry.toString(),
        weight: Number(weight),
        statusShip: "Оформлення",
        originDate: new Date(originDate).toISOString(),
        destinationDate: new Date(destinationDate).toISOString(),
        originRoute: originRoute,
        destinationRoute: destinationRoute,
        isInternational: getInternational(originCountry, destinationCountry),
        distance: distance,
        cost: cost,
        client: client,
        email: email,
      };
      setShipment(newOrder);
      setCreateElement(true);
    } else {
      toast.error("Не всі поля заповнено!", {
        position: toast.POSITION.TOP_RIGHT, // Встановлення позиції Toast
        autoClose: 3000, // Автоматичне закриття через 3 секунди
        hideProgressBar: true, // Відображення прогрес-бару
        closeOnClick: true, // Закриття Toast при кліку
        pauseOnHover: true, // Пауза при наведенні курсору
        draggable: true, // Можливість перетягування Toast
      });
    } // Показати Toast повідомлення
  };
  const handleDeleteShipment = () => {
    setCreateElement(false);
    setShipment(null);
    setSave(false);
    setOriginCity("");
    setDestinationCity("");
    setOriginCountry("");
    setDestinationCountry("");
    setWeight(50);
    setOriginDate(currentDate);
    setDestinationDate(currentDate);
    setOriginRoute([]);
    setdDestinationRoute([]);
    setEmail("");
    setCost(0);
    setClient("");
    setDistance(0);
    setOriginFlag(false);
    setoDestinationFlag(false);
  };
  const handleChangeShipment = () => {
    setCreateElement(false);
  };
  const handleDesignShipment = () => {
    const fetchAdd = addDataToMockAPI(shipment, "shipment");

    setOriginCity("");
    setDestinationCity("");
    setOriginCountry("");
    setDestinationCountry("");
    setWeight(50);
    setOriginDate(currentDate);
    setDestinationDate(currentDate);
    setOriginRoute([]);
    setdDestinationRoute([]);
    setEmail("");
    setCost("");
    setClient("");
    setDistance(0);
    setOriginFlag(false);
    setoDestinationFlag(false);

    setSave(fetchAdd);
  };
  const ErrorMessage = ({ message }) => {
    return <p style={{ color: "red" }}>{message}</p>;
  };
  return (
    <Container>
      {!createElement ? (
        <Title>Замовлення перевезення</Title>
      ) : (
        <Title>Оформлення замовлення</Title>
      )}

      <div style={{ display: "flex" }}>
        {!createElement && (
          <Form onSubmit={handleFormSubmit}>
            <FormRow>
              <Label htmlFor="originCity">Початковий пункт:</Label>
              <Input
                type="text"
                id="originCity"
                value={originCity}
                onInput={handleOriginCityChange}
              />
              <SuggestionsList>
                {suggestedOrigins
                  .filter(
                    (suggestion) => suggestion.components.city !== undefined
                  )
                  .map((suggestion) => (
                    <li
                      key={suggestion.geometry.lat + suggestion.geometry.lng}
                      onClick={() => handleSuggestionOriginSelected(suggestion)}
                    >
                      {suggestion.formatted}
                    </li>
                  ))}
              </SuggestionsList>
            </FormRow>
            {originCityError && <ErrorMessage message={originCityError} />}
            <FormRow>
              <Label htmlFor="originCountry">Країна походження:</Label>
              <Input
                type="text"
                id="originCountry"
                value={originCountry}
                disabled
              />
            </FormRow>

            <FormRow>
              <Label htmlFor="destinationCity">Кінцевий пункт:</Label>
              <Input
                type="text"
                id="destinationCity"
                value={destinationCity}
                onInput={handleDestinationCityChange}
              />

              <SuggestionsList>
                {suggestedDestinations
                  .filter(
                    (suggestion) => suggestion.components.city !== undefined
                  )
                  .map((suggestion) => (
                    <li
                      key={suggestion.geometry.lat + suggestion.geometry.lng}
                      onClick={() =>
                        handleSuggestionDestinationSelected(suggestion)
                      }
                    >
                      {suggestion.formatted}
                    </li>
                  ))}
              </SuggestionsList>
            </FormRow>
            {destinationCityError && (
              <ErrorMessage message={destinationCityError} />
            )}
            <FormRow>
              <Label htmlFor="destinationCountry">Країна призначення:</Label>
              <Input
                type="text"
                id="destinationCountry"
                value={destinationCountry}
                disabled
              />
            </FormRow>

            <FormRow>
              <Label htmlFor="originDate">Дата погрузки:</Label>
              <Input
                type="date"
                id="originDate"
                value={originDate}
                onInput={handleOriginDateChange}
                min={currentDate}
              />
            </FormRow>

            <FormRow>
              <Label htmlFor="client">Замовник:</Label>
              <Input
                type="string"
                id="client"
                value={client}
                onInput={handleClientChange}
              />
            </FormRow>
            {clientError && <ErrorMessage message={clientError} />}
            <FormRow>
              <Label htmlFor="email">Електронна пошта:</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onInput={handleEmailChange}
              />
            </FormRow>
            {emailError && <ErrorMessage message={emailError} />}

            <FormRow>
              <Label htmlFor="weight">Вага, кг:</Label>
              <Input
                type="number"
                id="weight"
                value={weight}
                onInput={handleWeightChange}
                min={50}
              />
            </FormRow>

            <FormRow>
              <Label htmlFor="distance">Відстань:</Label>
              <Input type="text" id="distance" value={distance} disabled />
            </FormRow>

            <FormRow>
              <Label htmlFor="cost">Вартість доставки:</Label>
              <Input type="text" id="cost" value={cost} disabled />
            </FormRow>

            <SubmitButton type="submit">
              <TextButton>Замовити перевезення</TextButton>
              <LocalShippingIcon />
            </SubmitButton>
          </Form>
        )}

        {createElement && (
          <div>
            <ButtonsContainer>
              <LinkButton onClick={handleDesignShipment}>
                Оформити замовлення
              </LinkButton>
            </ButtonsContainer>
            <ShipmentBlock
              shipment={shipment}
              handleChangeShipment={handleChangeShipment}
              handleDeleteShipment={handleDeleteShipment}
            />
            <MapWithRoute shipment={shipment} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default OrderForm;
