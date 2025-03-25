import { Card, Text } from "@mantine/core";

const DisplayCard = ({ label, amount, color }) => {
  return (
    <Card
      shadow="sm"
      p="xl"
      mb={50}
      style={{ height: "250px", textAlign: "center" }}
    >
      <Text weight={500} size={35} mt="md">
        {label}
      </Text>
      <Text mt="xs" size={35} color={color} weight={500}>
        ${amount.toLocaleString("en-US")}
      </Text>
    </Card>
  );
};

export default DisplayCard;
