const express = require('express');
const { SerialPort } = require('serialport');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());

const serialPort = new SerialPort({
  path: process.env.SERIAL_PORT || 'COM5',
  baudRate: 9600,
});

serialPort.on('open', () => {
  console.log('Puerto serial abierto');
});

serialPort.on('error', (err) => {
  console.error('Error en el puerto serial:', err.message);
});

// Ruta para encender el LED
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});
