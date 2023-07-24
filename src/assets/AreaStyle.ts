interface IAreaStyle {
  fill: string;
  stroke: string;
}

export const AreaStyle: { [key: string]: IAreaStyle } = {
  VPC: {
    fill: 'transparent',
    stroke: '#568837',
  },
  AvailableZone: {
    fill: 'transparent',
    stroke: '#000000',
  },
  PublicSubnet: {
    fill: '#D6F0B6',
    stroke: 'transparent',
  },
  PrivateSubnet: {
    fill: '#e8f2f7',
    stroke: 'transparent',
  },
};
