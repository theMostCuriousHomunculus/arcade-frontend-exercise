import React, { useState }  from 'react';
import { Box } from '@chakra-ui/react';

import { Person } from '../../types';

import { PeopleListItem } from './PeopleListItem';
import { PeopleListSearch } from './PeopleListSearch';

export interface Props {
  people: Person[];
}

export function PeopleList({
  people,
}: Props) {
  const [searchValue, setSearchValue] = useState('');

  const filteredPeople = React.useMemo(() => {
    return searchValue
      ? people.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      person.teamName.toLocaleLowerCase().includes(searchValue.toLowerCase()))
      : people;
  }, [searchValue, people]);

  const sortedPeople = React.useMemo(() => {
    return filteredPeople.sort((personA, personB) => {
      if (personA.name === personB.name) {
        return 0;
      }

      return personA.name > personB.name ? 1 : -1;
    });
  }, [filteredPeople]);


  function handleSearch(value) {
    setSearchValue(value);
  }

  return (
    <Box>
      <PeopleListSearch
        onSearch={handleSearch}
      />

      {sortedPeople.map(person => (
        <PeopleListItem
          key={person.id}
          {...person}
        />
      ))}
    </Box>
  );
}
