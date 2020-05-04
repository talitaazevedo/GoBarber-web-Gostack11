import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const ToastTypeVariation = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: boolean;
}

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;
  /* **
    * Arrumando o quadradinho

  */

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  /*
    ! faz um box shadow na parada fica show com isso
  */
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  & + div {
    margin-top: 8px;
  }

  /*
  * Faz a leitura das props e troca a cor
  */
  ${props => ToastTypeVariation[props.type || 'info']}

  /*
    ! > estiliza apenas um componente
  */
  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }
  button {
    position: absolute;
    right: 8px;
    top: 16px;
    border: 0;
    background: transparent;
    color: inherit;
  }
  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
`;
