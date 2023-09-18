import  { useState, useEffect } from 'react';
import './index.scss'
import { useImageLoadMutation } from './store/imageLoad'

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [resultArray, setResultArray] = useState(null);

  useEffect(() => {
    document.title = 'Digit Recognition'; 
  }, []);

  const [loadImage, { isLoading, error }] = useImageLoadMutation();
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setResult(null);
    setResultArray(null);
  };

  const handleUpload = async () => {
    try {
      setResult(null);
      setResultArray(null);
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await loadImage(formData);

      if (response.error) {
        throw new Error('Ошибка при отправке запроса');
      }
  
      const data = response.data;
      setResult(data.result);
      setResultArray(data.resultArray);
       
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    
  };

 
  const renderSelectedImage = () => {
    if (!selectedFile) {
      return null;
    }
    const imageUrl = URL.createObjectURL(selectedFile);
    return (
      <>
        <h3>Selected Image:</h3>
        <div className='image__wrapper'>
          <img src={imageUrl} alt="Selected" />
        </div>
      </>
    );
  };

  const formatResultArray = (array) => {
    return array.map((value) => value.toFixed(6));
  };

  return (
    <div className='wrapper'>
      <h1>Digit Recognition in Keras</h1>
  
      <input type="file" accept="image/*" onChange={handleFileChange} id="file"/>
      <label htmlFor="file" className='file__label'>
        Choose digit image
      </label>
      {renderSelectedImage()}
      {selectedFile && <button onClick={handleUpload} className='upload__button'>Recognize</button>}
      {isLoading && <div>load...</div>}
      {error && <div>error</div>}
      {result !== null && (
        <div className='results__wrapper'>
          <h2>This is {result}</h2>
          <h2> with {resultArray[result].toFixed(2)*100}% chance</h2>
          <p>Distribution of predictions : {formatResultArray(resultArray).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default App;
