import HighCart from './components/HighChartComponent';
import AdvertisementForm from './components/AdvertisementForm';

function App() {
  const baseUrl = 'http://localhost:3000';
  return (
    <div >
      <AdvertisementForm baseUrl={baseUrl}/>
      <HighCart baseUrl={baseUrl}/>
    </div>
  );
}

export default App;
