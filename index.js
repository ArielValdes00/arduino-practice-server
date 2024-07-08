const express = require('express');
const { SerialPort } = require('serialport');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const serialPort = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
});

serialPort.on('open', () => {
  console.log('Puerto serial abierto');
});

serialPort.on('error', (err) => {
  console.error('Error en el puerto serial:', err.message);
});

app.get('/led/on', (req, res) => {
  serialPort.write('ON\n', (err) => {
    if (err) {
      return res.status(500).send('Error al enviar el comando');
    }
    res.send('LED encendido');
  });
});

app.get('/led/off', (req, res) => {
  serialPort.write('OFF\n', (err) => {
    if (err) {
      return res.status(500).send('Error al enviar el comando');
    }
    res.send('LED apagado');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
