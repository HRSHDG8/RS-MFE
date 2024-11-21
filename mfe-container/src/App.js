import React, { Suspense } from 'react';

const Header = React.lazy(() => import('MFEOne/Header'));
const Footer = React.lazy(() => import('MFETwo/Footer'));

function App() {
  return (
    <div>
      <h1>Host Application</h1>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
