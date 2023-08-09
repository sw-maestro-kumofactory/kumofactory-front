interface IAreaStyle {
  fill: string;
  stroke: string;
}

export const AreaStyle: { [key: string]: IAreaStyle } = {
  VPC: {
    fill: 'transparent',
    stroke: '#568837',
  },
  AZ: {
    fill: 'transparent',
    stroke: '#000000',
  },
  SUBNET: {
    fill: '#D6F0B6',
    stroke: 'transparent',
  },
  PUBLIC: {
    fill: '#D6F0B6',
    stroke: 'transparent',
  },
  PRIVATE: {
    fill: '#e8f2f7',
    stroke: 'transparent',
  },
  DATABASE: {
    fill: '#f7e8e8',
    stroke: 'transparent',
  },
};
