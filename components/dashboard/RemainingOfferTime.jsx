import React, { useRef } from "react";

const RemainingOfferTime = ({ remainingTime }) => {
  const offerRef = useRef(null);

  const getRemainingTime = () => {
    const discountTime = new Date(remainingTime);
    const currentDate = new Date();

    const totalSeconds = Date.parse(discountTime) - Date.parse(currentDate);
    const seconds = Math.floor((totalSeconds / 1000) % 60);
    const minutes = Math.floor((totalSeconds / 1000 / 60) % 60);
    const hours = Math.floor((totalSeconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalSeconds / (1000 * 60 * 60 * 24));

    if (offerRef && offerRef.current) {
      offerRef.current.textContent = `${days} D ${hours} H ${minutes} M ${seconds} S`;
    }
  };

  return (
    <span className="remaining-time" style={{ color: "orange" }} ref={offerRef}>
      {setInterval(getRemainingTime, 1000)}
    </span>
  );
};

export default RemainingOfferTime;
