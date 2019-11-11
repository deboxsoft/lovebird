import React from 'react';

import { BirdAttributes } from '@deboxsoft/lb-module-farm-management-types';
import { Card, CardImage, CardHeader, CardBody } from '@deboxsoft/component-webapp-react';
import lovebirdImage from 'assets/lovebird.jpg';

interface Props {
  bird: BirdAttributes;
}

export default ({ bird }: Props) => {
  return (
    <Card>
      <CardImage src={lovebirdImage} />
      <CardBody>
        <CardHeader>{bird.ring}</CardHeader>
        <div>{bird.colorMutation}</div>
      </CardBody>
    </Card>
  );
};
