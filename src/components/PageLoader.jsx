import React from "react";
import Loader from "react-loader-spinner";

export default function PageLoader({ isVisible }) {
  return (
    <div id="loader-container">
      <Loader
        type="RevolvingDot"
        color="purple"
        height={150}
        width={150}
        visible={isVisible}
      />
    </div>
  );
}
