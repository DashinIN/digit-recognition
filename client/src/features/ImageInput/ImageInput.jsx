/* eslint-disable react/prop-types */



const ImageInput = ({file, setFile, setResult}) => {
    let imageUrl;

    if(file) {
     imageUrl = URL.createObjectURL(file);
    }
    
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setResult(null);
       
      };
    
  return (
    <>
        <input type="file" accept="image/*" onChange={handleFileChange} id="file"/>
        <label htmlFor="file" className='file__label'>Choose digit image</label>
        {file && (
            <>
                <h3>Selected Image:</h3>
                <div className='image__wrapper'>
                <img src={imageUrl} alt="Selected" />
                </div>
            </>
        )}
    </>
  )
}

export default ImageInput;