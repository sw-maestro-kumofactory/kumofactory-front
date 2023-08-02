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
  Subnet: {
    fill: '#D6F0B6',
    stroke: 'transparent',
  },
  Public: {
    fill: '#D6F0B6',
    stroke: 'transparent',
  },
  Private: {
    fill: '#e8f2f7',
    stroke: 'transparent',
  },
  Database: {
    fill: '#f7e8e8',
    stroke: 'transparent',
  },
};
