import { useState } from 'react';
import './App.css';
import background from './images/background.jpg'
import styled from 'styled-components';
function App() {
  const [input,setInput] = useState("")
  const [generatedImage, setGeneratedImage] = useState('');
  const query = async (data) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const handleGenerateImage = async () => {
    const imageData = await query({ "inputs": input });
    if (imageData) {
      setGeneratedImage(URL.createObjectURL(imageData));
    }
  };
  return (
    <Container className="App">
      <h1>Image AI Generator</h1>
      <Imagecontainer>
      {generatedImage && <img src={generatedImage} alt="Generated Image" />}
      </Imagecontainer>
      <ImageInput type='text' placeholder='enter a value' value={input} onChange={(e) => setInput(e.target.value)}/>
      <button class="slide" onClick={handleGenerateImage}>Generate Image</button>
    </Container>
  );
}

export default App;
const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  text-align: center;
  background: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  h1{
    margin: 0;
  }
`
const Imagecontainer = styled.div`
width: 400px;
height: 400px;
border-radius: 5px;
border: #fff solid;
img{
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
`
const ImageInput = styled.input`
padding-left: 10px;
box-sizing: border-box;
outline: 0;
border: 0;
border-radius: 5px;
height: 35px;
width: 500px;
`
