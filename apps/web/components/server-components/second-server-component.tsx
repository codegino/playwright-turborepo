import React from "react";

const SecondServerComponent = () => {
  return (
    <div className="bg-red-300">
      Showing Second Server Component because feature flag is disabled
    </div>
  );
};

export default SecondServerComponent;
