'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// UI Context
import { SoftUIProvider } from '@/context/SoftUI/SoftUIProvider';
import Prueba from './prueba/page';

export default function Home() {
  return (
    <SoftUIProvider>
      <Prueba />
    </SoftUIProvider>
  );
}
