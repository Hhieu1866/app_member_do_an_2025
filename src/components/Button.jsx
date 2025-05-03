import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, text, className, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`bg-primary py-4 text-white mx-6 rounded-3xl text-lg text-center ${className}`}
    >
      {text}
    </Link>
  );
};

export default Button;
