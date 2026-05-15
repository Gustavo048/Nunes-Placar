'use client';

import { useEffect, useState} from 'react';

interface Props {

  selectedState: string;
  selectedCity: string;

  onStateChange:
    (value: string) => void;

  onCityChange:
    (value: string) => void;
}

interface State {

  id: number;
  sigla: string;
  nome: string;
}

interface City {

  id: number;
  nome: string;
}

export default function StateCitySelect({

  selectedState,
  selectedCity,

  onStateChange,
  onCityChange,

}: Props) {

  /* STATES */

  const [
    states,
    setStates
  ] = useState<State[]>([]);

  const [
    cities,
    setCities
  ] = useState<City[]>([]);

  const [
    loadingCities,
    setLoadingCities
  ] = useState(false);

  /* LOAD STATES */

  useEffect(() => {

    async function loadStates() {

      try {
        const response =
          await fetch(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
          );

        const data =
          await response.json();

        setStates(data);

      } catch (error) {

        console.error(
          'Erro ao carregar estados:',
          error
        );
      }
    }

    loadStates();

  }, []);

  /* LOAD CITIES */

  useEffect(() => {

    async function loadCities() {

      if (!selectedState) {

        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);

        const response =
          await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
          );

        const data =
          await response.json();

        setCities(data);

      } catch (error) {

        console.error(
          'Erro ao carregar cidades:',
          error
        );

      } finally {

        setLoadingCities(false);
      }
    }

    loadCities();

  }, [selectedState]);

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >

      {/* ESTADO */}

      <select
        value={selectedState}

        onChange={(e) => {

          onStateChange(
            e.target.value
          );

          onCityChange('');
        }}

        className="
          w-full
          p-4
          rounded-xl
          bg-black
          border
          border-white/10
          text-white
          outline-none
          focus:border-yellow-500/40
          transition-all
        "
      >

        <option value="">
          Selecione o Estado
        </option>

        {states.map(state => (

          <option
            key={state.id}
            value={state.sigla}
          >

            {state.nome}

          </option>
        ))}
      </select>

      {/* CIDADE */}

      <select

        value={selectedCity}

        disabled={
          !selectedState ||
          loadingCities
        }

        onChange={(e) =>
          onCityChange(
            e.target.value
          )
        }

        className="
          w-full
          p-4
          rounded-xl
          bg-black
          border
          border-white/10
          text-white
          outline-none
          focus:border-yellow-500/40
          transition-all
          disabled:opacity-50
        "
      >

        <option value="">

          {loadingCities
            ? 'Carregando cidades...'
            : 'Selecione a Cidade'}

        </option>

        {cities.map(city => (

          <option
            key={city.id}
            value={city.nome}
          >

            {city.nome}

          </option>
        ))}
      </select>
    </div>
  );
}