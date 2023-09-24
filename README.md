
# Digit recognition

Решение задачи распознавания рукописных цифр при помощи искусственной нейронной сети. 

Сеть обучалась на  наборе данных MNIST, который содержит размеченные изображения рукописных цифр. Для обучения была использована библиотека [keras](https://keras.io/about/)

Обученная модель была преобразованна в формат для работы в javaScript с помощью [TensorFlow.js](https://www.tensorflow.org/)

Запросы обрабатываются сервером с Express, возвращая результат работы искусственной нейронной сети - предсказанное число. 

Запросы с клиента отправляются с помощью RTK Query, приложение написано на React + Redux toolkit


[Обучение модели в  Google Colaboratory](https://colab.research.google.com/drive/16Vr1D6XLpuvbR7cScZbRqrqdsk3WvAtl?usp=sharing)

