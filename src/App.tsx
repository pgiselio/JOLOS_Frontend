import React from 'react';
import { Header } from './components/header/header';
import { SidebarList } from './components/sidebar/sidebar-list';

function App() {
  return (
    <div className="grid-container">
        <Header/>
        <SidebarList />
        <div className="main">
          <div className="main-container">
            <main>
              <div className="content">
                <h2>BETOOOOOOOOOOOOOO!</h2>
                <h1>bola carro céu árvore joão pôr-do-sol </h1>
                <button type='button' className="btn-outlined">bom dia brasil</button>
              </div>
            </main>
            <footer>

            </footer>
          </div>
        </div>
      </div>
  );
}

export default App;