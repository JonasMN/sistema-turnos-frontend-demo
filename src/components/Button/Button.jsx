import React from "react";
import styles from "./Button.module.scss";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon: Icon,
  iconPosition = "left",
  ...props
}) => {

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "medium":
        return styles.medium;
      case "large":
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const renderContent = () => {
    if (iconPosition === "only" && Icon) {
      return <Icon size={16} />;
    }

    if (Icon && iconPosition === "left") {
      return (
        <>
          <Icon size={16} />
          {children && <span>{children}</span>}
        </>
      );
    }

    if (Icon && iconPosition === "right") {
      return (
        <>
          {children && <span>{children}</span>}
          <Icon size={16} />
        </>
      );
    }

    return children;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        styles.button
      } ${variant} ${getSizeClass()} ${className}`}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
