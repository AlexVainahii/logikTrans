import React from "react";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  CardWrapper,
  ProductName,
  Wrapper,
  Status,
  Wrap,
  WrapArrow,
  Dates,
  Pag,
  Weight,
  ButtonWrapper,
} from "./ShipmentBlock.styled";

const ShipmentBlock = ({
  shipment,
  handleChangeShipment,
  handleDeleteShipment,
}) => {
  return (
    <CardWrapper>
      <div>
        <ProductName>
          {shipment.isInternational
            ? "Міжнародне перевезення"
            : "Внутрішнє перевезення"}{" "}
          №: {shipment.shipmentNum}
        </ProductName>
        <Status>Статус: {shipment.statusShip}</Status>
        <Status>{shipment.client}</Status>
        <Wrapper>
          <Wrap>
            <Pag>Початковий пункт:</Pag>
            <Pag>{shipment.originCity}</Pag>
            <Pag>{shipment.originCountry}</Pag>
            <Dates>
              Дата: {new Date(shipment.originDate).toLocaleDateString()}
            </Dates>
            <Weight>Вага: {shipment.weight}кг</Weight>
          </Wrap>
          <WrapArrow>
            <Pag> {shipment.distance} км</Pag>
            <Icon component={ArrowForwardIcon} />
          </WrapArrow>
          <Wrap>
            <Pag>Кінцевий пункт:</Pag>
            <Pag>{shipment.destinationCity}</Pag>
            <Pag> {shipment.destinationCountry}</Pag>
            <Dates>
              Дата: {new Date(shipment.destinationDate).toLocaleDateString()}
            </Dates>
            <Weight>Ціна: {shipment.cost}грн</Weight>
          </Wrap>
        </Wrapper>
      </div>

      <ButtonWrapper>
        <Tooltip title="Змінити деталі замовлення" placement="top">
          <AutoFixHighIcon onClick={handleChangeShipment} />
        </Tooltip>
        <Tooltip title="Видалити замовлення" placement="top">
          <DeleteIcon onClick={handleDeleteShipment} />
        </Tooltip>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default ShipmentBlock;
