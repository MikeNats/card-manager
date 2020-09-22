import React from "react"; 
import { ButtonProps } from './types';

 
const Button = ({
  onClickHandler, 
  className, 
  ...props  
  }: ButtonProps)  =>(
    <button
      className={`comp-button ${className}`}    
      onClick={(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ): void => onClickHandler ? onClickHandler(e) : undefined}
        {...props}>
      { props.children }
    </button>
  ); 

export default React.memo(Button);