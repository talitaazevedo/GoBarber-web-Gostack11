import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

// import Tooltip from '../Tooltip';
import { Container, Error } from './styles';

interface Inputprops extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
const Input: React.FC<Inputprops> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  // Quando tenho uma um componente em forma de função, toda vez que ele for criado ele vai ser renderizado
  // o hook useCallBack permite que as funções  sejam armazenadas na memoria.
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // InputRef armazena as referências de input o .current acessa propriedade direto do input

    // if (inputRef.current?.value) {
    //   setIsFilled(true);
    // } else {
    //   setIsFilled(false);
    // }
    // Faz a mesma coisa do if mas transformando em booleano !! com duas negações a primeira nega e a segunda transforma em true.

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
