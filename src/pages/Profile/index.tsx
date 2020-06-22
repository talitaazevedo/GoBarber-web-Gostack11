import React, { useCallback, useRef, FormEvent, ChangeEvent } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { Container, Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}
const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // console.log(formRef);
  const { addToast } = useToast();

  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'no mínimo 6 digitos'),
        });
        // valida o schema do Yup
        await schema.validate(data, {
          abortEarly: false,
        });
        // Conneca com a API
        await api.post('/users', data);

        history.push('/');
        // Adicionando um hook de Toast

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no goBarber',
        });
      } catch (err) {
        // ! Verificar se o erro é uma instancia de Yup Validation Error
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          // ? significa que num primeiro momento o formRef é nulo
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        // Classe do Javascript padrão para trabalhar com o multipart Form Data
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar Atualizado! ',
          });
        });
        console.log(e.target.files[0]);
      }
    },
    [addToast, updateUser],
  );
  return (
    <>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              {' '}
              <FiArrowLeft />
            </Link>
          </div>
        </header>
        <Content>
          {/* initialData */}
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <h1>Meu Perfil</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha Atual"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />
            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
