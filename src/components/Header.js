import React from 'react';
import { Icon, Header as NBHeader, Title, Left, Right, Body, Button, View } from 'native-base';

const Header = ({ back, title }) => (
  <NBHeader>
    {back ? (
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
    ) : (
      <View />
    )}
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right>
      <Button transparent>
        <Icon name="menu" />
      </Button>
    </Right>
  </NBHeader>
);

export { Header };
