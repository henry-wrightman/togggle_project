import React from 'react';

const Text = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

const HeavyText = ({ otherClasses, children }) => {
  return <Text className={`heavyText ${otherClasses}`}>{children}</Text>;
};

const NormalText = ({ otherClasses, children }) => {
  return <Text className={`normalText ${otherClasses}`}>{children}</Text>;
};

const LightText = ({ otherClasses, children }) => {
  return <Text className={`lightText ${otherClasses}`}>{children}</Text>;
};

export { HeavyText, LightText, NormalText };