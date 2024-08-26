import {
  BadgeDelta,
  Card,
  CategoryBar,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import React from "react";

type Props = {
  name: string;
  amount: number;
  edge: number
};

const DataCard = (props: Props) => {
  const { name, amount , edge} = props;
  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <Flex alignItems="start">
          <div>
            <Text>{name}</Text>
            <Metric>{amount}</Metric>
          </div>
          <BadgeDelta deltaType="moderateIncrease">{edge}</BadgeDelta>
        </Flex>
        
        <CategoryBar
            values={[5, 5 , 10]}
            colors={['emerald', 'yellow', 'rose']}
            markerValue={amount}
          />
      </Card>
    </div>
  );
};

export default DataCard;
