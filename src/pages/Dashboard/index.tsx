import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiPower, FiLock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

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

interface MonthAvialabilityItem {
  day: number;
  available: boolean;
}

const DashBoard: React.FC = () => {
  const { signOut, user } = useAuth();
  // States
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvialabilityItem[]
  >([]);
  // Functions
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);
  // Dispara uma função toda vexz que uma ou mais variáveis dispararem
  useEffect(() => {
    // Toda vez que a variável currentmonth estiver diferente
    //  vai na aPI  e busca dados.
    api
      .get(`/providers/${user.id}/month-availability`, {
        // isso aqui são query params

        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);
  // nunca criar variáveis ou manipular valores, dentro da renderização
  //  por que tudo vai acabar recarregando do ZERO
  // Para isso utilize o useMemo, que serve para  armazenar uma informação e falar para ela quando é necessário recarregar.
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  // console.log(user);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo(a)</span>
              <strong>{user.name}</strong>
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
              <img src={user.avatar_url} alt={user.name} />
              <strong>{user.name}</strong>
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
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
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
