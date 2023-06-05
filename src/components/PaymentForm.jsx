import React, { useEffect, useState } from "react";
import { Input, Label, PForm, SubmitButton } from "./PaymentForm.styled";
import { Title } from "./OrderForm.styled";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataByIdFromMockAPI } from "../fakeApi";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

const PaymentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [shipment, setShipment] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const fetchedShipment = await fetchDataByIdFromMockAPI(
            "shipment",
            id
          );
          if (fetchedShipment.length !== 0) {
            setShipment(fetchedShipment[0]);
            setName(fetchedShipment[0].client);
          }
        } catch (error) {
          console.error("Помилка при отриманні перевезень:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate(`/`);
    toast.success("Замовлення Оплачено!", {
      position: toast.POSITION.TOP_RIGHT, // Встановлення позиції Toast
      autoClose: 3000, // Автоматичне закриття через 3 секунди
      hideProgressBar: true, // Відображення прогрес-бару
      closeOnClick: true, // Закриття Toast при кліку
      pauseOnHover: true, // Пауза при наведенні курсору
      draggable: true, // Можливість перетягування Toast
    });
    setName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };
  const handleExpiryDate = (e) => {
    const expiryDate = e.target.value;
    const formattedexpiryDate = expiryDate.split(""); // Розбиваємо рядок на масив символів
    if (formattedexpiryDate.length === 2) {
      formattedexpiryDate.push("/");
    }

    setExpiryDate(formattedexpiryDate.join(""));
  };
  const handleCardNumber = (e) => {
    const cardNumber = e.target.value;
    const formattedCardNumber = cardNumber.split(""); // Розбиваємо рядок на масив символів
    if (
      formattedCardNumber.length === 4 ||
      formattedCardNumber.length === 9 ||
      formattedCardNumber.length === 14
    ) {
      formattedCardNumber.push(" ");
    }

    setCardNumber(formattedCardNumber.join(""));
  };
  const handleCancel = async (e) => {
    toast.error("Замовлення Скасовано!", {
      position: toast.POSITION.TOP_RIGHT, // Встановлення позиції Toast
      autoClose: 3000, // Автоматичне закриття через 3 секунди
      hideProgressBar: true, // Відображення прогрес-бару
      closeOnClick: true, // Закриття Toast при кліку
      pauseOnHover: true, // Пауза при наведенні курсору
      draggable: true, // Можливість перетягування Toast
    });
    navigate(`/`);
    setName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };
  return (
    <>
      <Title>Оплата замовлення</Title>
      {isloading ? (
        <Loader />
      ) : (
        <PForm onSubmit={handleSubmit}>
          {shipment && (
            <Label style={{ textAlign: "center", fontWeight: "900" }}>
              № {shipment.shipmentNum}
            </Label>
          )}{" "}
          <Label>
            Ім'я замовника:
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Label>
          <Label>
            Номер кредитної/дебетової картки:
            <Input
              type="text"
              value={cardNumber}
              maxLength={19}
              onChange={handleCardNumber}
              pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
              required
            />
          </Label>
          <Label>
            Термін дії (MM/РР):
            <Input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDate}
              maxLength={5}
              required
              pattern="(0[1-9]|1[0-2])/\d{2}"
              placeholder="MM/РР"
            />
          </Label>
          <Label>
            CVV-код:
            <Input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
              required
            />
          </Label>
          <Label>Сума замовлення {shipment && shipment.cost} грн</Label>
          <SubmitButton type="submit" style={{ marginTop: "20px" }}>
            Олатити замовлення
          </SubmitButton>
          <SubmitButton
            type="button"
            style={{ marginTop: "20px" }}
            onClick={handleCancel}
          >
            Скасувати замовлення
          </SubmitButton>
        </PForm>
      )}
    </>
  );
};

export default PaymentForm;
