import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchDogFacts = async () => {
  console.log('Fetching dog facts...');
  const response = await fetch('https://dogapi.dog/api/v2/facts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Fetched dog facts:', data);
  return data;
};

const DogFacts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['dogFacts'],
    queryFn: fetchDogFacts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const facts = data?.data || [];

  if (facts.length === 0) {
    console.log('No facts available');
    return <p>No facts available</p>;
  }

  return (
    <div>
    <h2>Random Dog Fact</h2>
    <ul>
      {facts.map((fact) => (
        <li key={fact.id}>{fact.attributes.body}</li>
      ))}
    </ul>
    </div>
  );
};

export default DogFacts;

