import React from 'react';
import MainContent from './components/MainContent';
import TopContent from './components/TopContent';

function Content() {
  return (
    <div className="content">
      <TopContent />
      <MainContent />
    </div>
  );
}

export default Content;
