import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import {
  InputContainer,
  InputPassStyled,
  InputStyled,
  ShowPasswordButton,
} from "./styles";

interface input extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  icon?: string;
}

export const Input = React.forwardRef(function (
  { name, type, icon, placeholder, ...rest }: input,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  if (type.match("password")) {
    return (
      <InputContainer>
        <InputPassStyled
          type={showPassword ? "text" : "password"}
          name={name}
          ref={ref}
          {...rest}
          {...(icon && { hasIcon: true })}
          {...(placeholder && { hasPlaceholder: true})}
        />
        {icon && <i className={icon}></i>}
        {placeholder && <span className="placeholder">{placeholder}</span>}
        <ShowPasswordButton
          tabIndex={-1}
          type="button"
          title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className={showPassword ? "active" : ""}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </InputContainer>
    );
  } else {
    return (
      <InputContainer>
        <InputStyled
          type={type}
          name={name}
          ref={ref}
          {...rest}
          {...(icon && { hasIcon: true })}
          {...(placeholder && { hasPlaceholder: true})}
        />
        {icon && <i className={icon}></i>}
        {placeholder && <span className="placeholder">{placeholder}</span>}
      </InputContainer>
    );
  }
});
