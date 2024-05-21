import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchDogBreeds = async () => {
  console.log('Fetching dog breeds...');
  const response = await fetch('https://dogapi.dog/api/v2/breeds');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Fetched dog breeds:', data);
  return data;
};

const DogBreeds = ({ onSelectBreed }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['dogBreeds'],
    queryFn: fetchDogBreeds,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const breeds = data?.data || [];

  if (breeds.length === 0) {
    console.log('No breeds available');
    return <p>No breeds available</p>;
  }

  return (
    <div>
    <h2>Dog Breeds</h2>
    <ul>
      {breeds.map((breed) => (
        <li key={breed.id} onClick={() => onSelectBreed(breed.id)}>
          {breed.attributes.name}
        </li>
      ))}
    </ul>
    </div>
  );
};

export default DogBreeds;


