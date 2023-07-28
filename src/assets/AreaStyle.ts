interface IAreaStyle {
  fill: string;
  stroke: string;
}

export const AreaStyle: { [key: string]: IAreaStyle } = {
  VPC: {
    fill: 'transparent',
    stroke: '#568837',
  },
  'ap-northeast-2a': {
    fill: 'transparent',
    stroke: '#000000',
  },
  Public: {
    fill: '#D6F0B6',
    stroke: 'transparent',
  },
  Private: {
    fill: '#e8f2f7',
    stroke: 'transparent',
  },
};
