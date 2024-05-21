import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchBreedDetails = async ({ queryKey }) => {
  const [, breedId] = queryKey;
  const response = await fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const BreedDetails = ({ breedId }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['breed', breedId],
    queryFn: fetchBreedDetails
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const breed = data.data.attributes;

  return (
    <div>
      <h2>{breed.name}</h2>
      <p>{breed.description}</p>
      <p><strong>Life Span:</strong> {breed.life.min} - {breed.life.max} years</p>
      <p><strong>Male Weight:</strong> {breed.male_weight.min} - {breed.male_weight.max} kg</p>
      <p><strong>Female Weight:</strong> {breed.female_weight.min} - {breed.female_weight.max} kg</p>
      <p><strong>Hypoallergenic:</strong> {breed.hypoallergenic ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default BreedDetails;

