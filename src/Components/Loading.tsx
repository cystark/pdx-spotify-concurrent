import React from "react";

type LoadingProps = {
  width?: string;
};

const Loading: React.FC<LoadingProps> = ({ width = 200 }) => (
  <img
    width={width}
    alt=""
    src="https://media.giphy.com/media/7uUD5fjU5cUVy/giphy.gif"
  />
);

export default Loading;
