import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiLock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const DashBoard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  console.log(user);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img
              src="https://avatars0.githubusercontent.com/u/24778188?s=460&v=4"
              alt="Talita Azevedo"
            />
            <div>
              <span>Bem-vindo</span>
              <strong>Talita Azevedo</strong>
            </div>
          </Profile>
          <button type="submit" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1> Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda Feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/24778188?s=460&v=4"
                alt="Talita Azevedo"
                srcSet=""
              />
              <strong> Talita Azevedo</strong>
              <span>
                <FiLock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong> Manhã</strong>
            <Appointment>
              <span>
                <FiLock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/24778188?s=460&v=4"
                  alt="Talita Azevedo"
                />
                <strong> Talita Azevedo </strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiLock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/24778188?s=460&v=4"
                  alt="Talita Azevedo"
                />
                <strong> Talita Azevedo </strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong> Tarde </strong>

            <Appointment>
              <span>
                <FiLock />
                13:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/24778188?s=460&v=4"
                  alt="Talita Azevedo"
                />
                <strong> Talita Azevedo </strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default DashBoard;
