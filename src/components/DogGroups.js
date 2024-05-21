import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchDogGroups = async () => {
  console.log('Fetching dog groups...');
  const response = await fetch('https://dogapi.dog/api/v2/groups');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Fetched dog groups:', data);
  return data;
};

const DogGroups = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['dogGroups'],
    queryFn: fetchDogGroups,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const groups = data?.data || [];

  if (groups.length === 0) {
    console.log('No groups available');
    return <p>No groups available</p>;
  }

  return (
    <div>
    <h2>Dog Groups</h2>
    <ul>
      {groups.map((group) => (
        <li key={group.id}>{group.attributes.name}</li>
      ))}
    </ul>
    </div>
  );
};

export default DogGroups;
