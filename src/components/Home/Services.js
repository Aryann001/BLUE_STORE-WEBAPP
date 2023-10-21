import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <div className="servicesContainer">
      <div className="service-1">
        <div>
          <TbTruckDelivery />
          <p>Super Fast and Free Delivery</p>
        </div>
      </div>

      <div className="service-2">
        <div>
          <MdSecurity />
          <p>Non-contact Shipping</p>
        </div>

        <div>
          <GiReceiveMoney />
          <p>Money-back Guaranteed</p>
        </div>
      </div>

      <div className="service-3">
        <div>
          <RiSecurePaymentLine />
          <p>Super Secure Payment System</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
