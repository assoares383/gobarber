import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import AuthContext from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import lgoGoBarber from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { AnimationContainer, Background, Container, Content } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const auth = useContext(AuthContext);

  // eslint-disable-next-line no-console
  console.log(auth);

  const handleSubmit = useCallback(async data => {
    formRef.current?.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um email valido'),
        password: Yup.string().required('Senha obrigatoria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={lgoGoBarber} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="/">Esqueci minha senha</a>
          </Form>

          <a href="/">
            <FiLogIn /> Criar Conta
          </a>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
