import '@styles/globals.scss';

export const metadata = {
  title: 'Cantina Tech'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="pt-br">
        <body>
          <div className="main"/>
          <main className="app">
            {children}
          </main>
        </body>
    </html>
  )
}

export default RootLayout;