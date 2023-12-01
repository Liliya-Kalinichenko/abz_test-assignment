import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { RandomObject } from './types';
import { getBlocks } from './api/blocks';
import BlockList from './components/BlockList';
import AddForm from './components/AddForm';
import { Loader } from './components/Loader';
import { ErrorModal } from './components/ErrorModal';

function App() {
  const [blocks, setBlocks] = useState<RandomObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadError(false);

    getBlocks()
      .then((dataFromServer) => {
        setBlocks(dataFromServer.slice(-3))
      })
      .catch(() => {
        setIsLoadError(true);
      })
      .finally(() =>{ 
        setIsLoading(false)
        setTimeout(() => {
          setIsLoadError(false)
        }, 3000)
      })
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="App__main container">
        <AddForm setBlocks={setBlocks}/>
        {isLoading ? (
          <Loader />
        ) : (
          <BlockList blocks={blocks} setBlocks={setBlocks} />
        )}

        {isLoadError && <ErrorModal onClose={setIsLoadError} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
