import axios from "axios";
export const addDataToMockAPI = async (data, endpoint) => {
  try {
    const response = await axios.post(
      `https://646bb7ca7d3c1cae4ce43282.mockapi.io/api/logic/${endpoint}`,
      data
    );
    console.log("Дані успішно додані до MockAPI:", response.data);
    return true;
    // Тут ви можете додатково обробити відповідь сервера або виконати інші дії
  } catch (error) {
    console.error("Помилка при додаванні даних до MockAPI:", error);
  }
};
export async function fetchDataFromMockAPI(endpoint) {
  try {
    const response = await axios.get(
      `https://646bb7ca7d3c1cae4ce43282.mockapi.io/api/logic/${endpoint}`
    );
    // Отримано дані з бекенду MockAPI
    const data = response.data;
    // Обробка отриманих даних

    return data;
  } catch (error) {
    // Обробка помилки
    console.error(error);
    throw error;
  }
}
export async function fetchDataByIdFromMockAPI(endpoint, id) {
  try {
    const response = await axios.get(
      `https://646bb7ca7d3c1cae4ce43282.mockapi.io/api/logic/${endpoint}?idd=${id}`
    );
    // Отримано дані з бекенду MockAPI за заданим id
    const data = response.data;
    // Обробка отриманих даних

    return data;
  } catch (error) {
    // Обробка помилки
    console.error(error);
    throw error;
  }
}

// Використання функції для отримання даних за id
// Замініть 1 на власний id

export const getInternational = (origin, destination) => {
  return origin !== destination;
};

export const getcentrMap = (shipment) => {
  const centerLat =
    (shipment.originRoute.lat + shipment.destinationRoute.lat) / 2;
  const centerLng =
    (shipment.originRoute.lng + shipment.destinationRoute.lng) / 2;
  return [centerLng, centerLat];
};

export function getDistance(originRoute, destinationRoute) {
  const earthRadius = 6371; // Радіус Землі в кілометрах

  const dLat = toRadians(destinationRoute.lat - originRoute.lat);
  const dLon = toRadians(destinationRoute.lng - originRoute.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(originRoute.lat)) *
      Math.cos(toRadians(destinationRoute.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return Math.round(distance);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
export function getZoom(distance) {
  if (distance > 1800) {
    return 1;
  }
  if (distance > 1400) {
    return 2;
  }
  if (distance > 1000) {
    return 3;
  }

  if (distance > 500) {
    return 4;
  }
  return 5;
}
export function getdestinationDate(distance, originDate) {
  const currentDate = new Date(originDate);

  if (distance > 2500) {
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 8);
    return formatDate(deliveryDate);
  }
  if (distance > 1800) {
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 6);
    return formatDate(deliveryDate);
  }
  if (distance > 1400) {
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 4);
    return formatDate(deliveryDate);
  }
  if (distance > 1000) {
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 3);
    return formatDate(deliveryDate);
  }
  if (distance > 500) {
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 2);
    return formatDate(deliveryDate);
  }

  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 1);
  return formatDate(deliveryDate);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateShippingCost(
  distance,
  weight,
  pricePerKilometer,
  transportType
) {
  let baseCost = distance * pricePerKilometer;

  if (transportType) {
    baseCost *= 1.5;
  } else {
    baseCost *= 1;
  }

  if (weight > 1000) {
    const overweightCharge = (weight - 1000) * 0.5;
    baseCost += overweightCharge;
  }

  return Math.round(baseCost);
}

// Замініть на ваш пароль
