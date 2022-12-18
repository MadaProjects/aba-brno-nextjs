import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export const Tabs = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [maxTabs, setMaxTabs] = useState(0);

  useEffect(() => {
    setMaxTabs(tabs.length);
  }, []);

  const handleTabChange = (e) => {
    console.log(`TAB CHANGED  - ${maxTabs}`);
    setCurrentTab(e.currentTarget.dataset.id);
  };

  // TODO tabs moving on kebyoard - https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
  const changeTabOnKeyDown = (e) => {
    /*
    e.preventDefault();
    switch (e.key) {
      case 'ArrowRight':
        const moveToRight =
          currentTab + 1 >= maxTabs ? maxTabs : currentTab + 1;
        setCurrentTab(moveToRight);
        break;
      default:
        break;
    }
    */
  };

  return (
    <div
      data-testid='tabs'
      className='mb-4 border-b border-gray-200 dark:border-gray-700'>
      <div
        role='tablist'
        className='flex flex-wrap -mb-px text-sm font-medium text-center'>
        {tabs
          ? tabs.map((tab, i) => (
              <button
                data-id={i}
                id={`tab-${i}`}
                role='tab'
                aria-selected={currentTab === i ? true : false}
                aria-controls={`tabpanel-${i}`}
                key={`tabbtn-${i}`}
                tabIndex={currentTab == i ? '0' : '-1'}
                onClick={handleTabChange}
                onKeyDown={changeTabOnKeyDown}
                className={
                  currentTab == i
                    ? 'inline-block p-4 rounded-t-lg border-b-2 text-primary hover:text-blue-600 dark:text-secondary dark:hover:text-blue-500 border-primary dark:border-secondary'
                    : 'inline-block p-4 rounded-t-lg border-b-2 hover:text-blue-600 dark:hover:text-blue-500'
                }>
                <span className='inline'>{tab.Title}</span>
              </button>
            ))
          : ''}
      </div>
      <div>
        {tabs
          ? tabs.map((tab, i) => (
              <div
                key={`tabpanel-${i}`}
                id={`tabpanel-${i}`}
                tabIndex='0'
                aria-labelledby={`tab-${i}`}
                className={
                  currentTab == i
                    ? 'block p-4 bg-gray-50 rounded-lg dark:bg-gray-800'
                    : 'hidden'
                }>
                <ReactMarkdown>{tab.Text}</ReactMarkdown>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Text: PropTypes.string.isRequired,
    })
  ),
};
