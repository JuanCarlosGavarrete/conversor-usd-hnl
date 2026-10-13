import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const API_URL = 'https://open.er-api.com/v6/latest/USD';

function App() {
  const [cantidadUSD, setCantidadUSD] = useState('1');
  const [tasaCambio, setTasaCambio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerTasaCambio = async () => {
      try {
        setCargando(true);
        setError('');

        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
          throw new Error('No se pudo consultar el servicio de cambio.');
        }

        const datos = await respuesta.json();
        const tasaHNL = datos?.rates?.HNL;

        if (datos.result !== 'success' || typeof tasaHNL !== 'number' || !Number.isFinite(tasaHNL)) {
          throw new Error('La API no devolvió una tasa de cambio válida.');
        }

        setTasaCambio(tasaHNL);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      } finally {
        setCargando(false);
      }
    };

    obtenerTasaCambio();
  }, []);

  const cantidadNumerica = Number(cantidadUSD);
  const totalHNL =
    cantidadUSD.trim() !== '' && Number.isFinite(cantidadNumerica) && cantidadNumerica >= 0 && tasaCambio !== null
      ? cantidadNumerica * tasaCambio
      : null;

  const formatoMoneda = (valor, moneda) =>
    new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: moneda,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);

  return (
    <Box className="page-background">
      <Container maxWidth="sm" className="main-container">
        <Paper elevation={5} className="converter-card">
          <Box className="hero-icon">
            <CurrencyExchangeIcon sx={{ fontSize: 38 }} />
          </Box>

          <Typography component="h1" variant="h4" fontWeight={800} textAlign="center">
            Conversor de divisas
          </Typography>
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 1, mb: 3 }}>
            Convierte dólares estadounidenses a lempiras hondureños.
          </Typography>

          {cargando && (
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ my: 3 }}>
              <CircularProgress size={23} />
              <Typography>Cargando tasa de cambio...</Typography>
            </Stack>
          )}

          {!cargando && error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              action={
                <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {!cargando && !error && tasaCambio !== null && (
            <>
              <Paper variant="outlined" className="rate-box">
                <Typography variant="body2" color="text.secondary">
                  Tasa de cambio consultada
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  1 USD = {tasaCambio.toFixed(4)} HNL
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  La tasa puede cambiar con el tiempo.
                </Typography>
              </Paper>

              <TextField
                label="Cantidad en dólares (USD)"
                type="number"
                fullWidth
                value={cantidadUSD}
                onChange={(evento) => setCantidadUSD(evento.target.value)}
                inputProps={{ min: 0, step: 'any' }}
                helperText="Escribe la cantidad que deseas convertir."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mt: 3 }}
              />

              <Box className="result-box" sx={{ mt: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <AccountBalanceWalletIcon />
                  <Typography variant="subtitle1">Total en lempiras (HNL)</Typography>
                </Stack>
                <Typography variant="h3" className="result-amount">
                  {totalHNL === null ? '—' : formatoMoneda(totalHNL, 'HNL')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {totalHNL === null
                    ? 'Ingresa una cantidad válida, igual o mayor que cero.'
                    : `${formatoMoneda(cantidadNumerica, 'USD')} equivalen a ${formatoMoneda(totalHNL, 'HNL')}`}
                </Typography>
              </Box>
            </>
          )}

          <Box className="attribution">
            <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">
              Rates By Exchange Rate API
            </a>
          </Box>
        </Paper>
        <Typography variant="caption" color="text.secondary" textAlign="center" display="block" sx={{ mt: 2 }}>
          Proyecto educativo desarrollado con React, useState, useEffect y Material UI.
        </Typography>
      </Container>
    </Box>
  );
}

export default App;