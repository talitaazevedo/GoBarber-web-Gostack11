import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // console.log(formRef);
  // Utilizando o context  com o hook useContext
  const { signIn } = useAuth();
  const { addToast } = useToast();
  // const { name } = useContext(AuthContext);
  // console.log(signIn);

  // console.log(user);

  const handleSubmit = useCallback(
    // Com o useCallback toda váriavel externa ou função
    // Adicione lá no final [] para o useCallback monitorar.
    // data: SignInFormData => é o tipo de dado que o data vai receber.
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'Senha Obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        // ! Verificar se o erro é uma instancia de Yup Validation Error
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          // ? significa que num primeiro momento o formRef é nulo
          formRef.current?.setErrors(errors);
        }
        // ? caso não seja retornar uma mensagem mais generica.
        //* retornar um toast
        addToast({
          type: 'error',
          title: 'Erro na axutenticação',
          description: 'Ocorreu um erro ao fazer login',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça Seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <a href="#asda"> Esqueci minha senha</a>
          </Form>

          <a href="http://">
            <FiLogIn />
            Criar Conta
          </a>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
