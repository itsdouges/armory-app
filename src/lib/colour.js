// @flow

type Colour = {
  r: string,
  g: string,
  b: string,
};

const extractColour = (c?: Colour, opacity: number) =>
  c && `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;

export default extractColour;
