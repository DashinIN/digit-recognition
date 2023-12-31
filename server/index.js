const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());
app.use(cors());

async function preprocessImage(imageBuffer) {
  try {
    const image = await Jimp.read(imageBuffer);
    image.greyscale();
    image.resize(28, 28);
    const imageData = image.bitmap.data;
    const inputArray = [];
    for (let y = 0; y < 28; y++) {
      const row = [];
      for (let x = 0; x < 28; x++) {
        const pixelIndex = (y * 28 + x) * 4; 
        const pixelValue = imageData[pixelIndex]; 
        row.push(pixelValue);
      }
      inputArray.push(row);
    }
    return inputArray;
  } catch (error) {
    console.error('Ошибка при обработке изображения:', error);
    return null;
  }
}


app.use('/model', express.static(path.join(__dirname, 'model')));
const modelPath = 'https://digit-recognition-api.onrender.com/model/model.json'

app.post('/classify', upload.single('image'), async (req, res) => {
  try {
    const model = await tf.loadLayersModel(modelPath);
    const image = req.file.buffer;
    const grayscaleImage = await preprocessImage(image);

    if (grayscaleImage === null) {
      return res.status(500).json({ error: 'Ошибка при обработке изображения' });
    }
    const inputTensor = tf.tensor(grayscaleImage).reshape([1, 28 * 28]);
    const prediction = await model.predict(inputTensor);
    const predictionArray = prediction.arraySync();
    const results = predictionArray[0]
    const maxIndex = results.indexOf(Math.max(...results))

    res.json({result: maxIndex, resultArray:results});

  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
