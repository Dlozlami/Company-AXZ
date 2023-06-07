import './App.css';
import Navbar from './components/navBar';
import MainContent from './components/mainContent';
import ImageUpload from './components/ImageUpload';


export default function App() {
  return(
    <>
      <Navbar/>
      <MainContent/>
      <ImageUpload/>
    </>
  );
}
