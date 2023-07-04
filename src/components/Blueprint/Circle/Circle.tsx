interface IProps {
  id: string;
  cx: number;
  cy: number;
}

const Circle = ({ id, cx, cy }: IProps) => {
  return <circle cx={cx} cy={cy} r='3' />;
};

export default Circle;
