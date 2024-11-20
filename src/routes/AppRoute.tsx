import AppLayout from '@/layouts/AppLayout';
import Home from '@/modules/home/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
