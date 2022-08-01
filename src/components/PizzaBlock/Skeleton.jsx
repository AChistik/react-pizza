import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="130" cy="150" r="130" />
    <rect x="0" y="345" rx="10" ry="10" width="280" height="68" />
    <rect x="0" y="435" rx="10" ry="10" width="100" height="25" />
    <rect x="130" y="425" rx="10" ry="10" width="150" height="35" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="25" />
  </ContentLoader>
);

export default Skeleton;
