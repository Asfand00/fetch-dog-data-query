import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DogBreeds from './components/DogBreeds';
import BreedDetails from './components/BreedDetails';
import DogFacts from './components/DogFacts';
import DogGroups from './components/DogGroups';

const queryClient = new QueryClient();

const App = () => {
  const [selectedBreedId, setSelectedBreedId] = useState(null);
  const [view, setView] = useState('breeds');

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <button onClick={() => { setView('breeds'); setSelectedBreedId(null); }}>Breeds</button>
          <button onClick={() => setView('facts')}>Facts</button>
          <button onClick={() => setView('groups')}>Groups</button>
        </nav>

        {view === 'breeds' && (
          <div>
            {selectedBreedId ? (
              <BreedDetails breedId={selectedBreedId} />
            ) : (
              <DogBreeds onSelectBreed={setSelectedBreedId} />
            )}
          </div>
        )}
        {view === 'facts' && <DogFacts />}
        {view === 'groups' && <DogGroups />}
      </div>
    </QueryClientProvider>
  );
};

export default App;

