import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { CriarSala } from "./pages/CriarSala";
import { Sala } from './pages/Sala';
import { AdminSala } from './pages/AdminSala';
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sala/nova" element={<CriarSala />} />
            <Route path="/sala/:id" element={<Sala />} />
            <Route path="/admin/sala/:id" element={<AdminSala />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
