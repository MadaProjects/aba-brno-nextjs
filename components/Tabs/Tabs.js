import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { ConatactForm } from '../Form/ContactForm';

export const Tabs = ({ tabs = [], sendContactTo = '' }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [maxTabs, setMaxTabs] = useState(tabs.length + 1);

  const handleTabChange = (e) => {
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
                    ? 'inline-block p-4 rounded-t-lg border-b-2 text-primary hover:text-primary dark:text-secondary dark:hover:text-secondary border-primary dark:border-secondary'
                    : 'inline-block p-4 rounded-t-lg border-b-2 hover:text-primary dark:hover:text-secondary'
                }>
                <span className='inline text-[16px]'>{tab.Title}</span>
              </button>
            ))
          : ''}

        <button
          data-id={999}
          id={`tab-999`}
          role='tab'
          aria-selected={currentTab === 999 ? true : false}
          aria-controls={`tabpanel-999`}
          key={`tabbtn-999`}
          tabIndex={currentTab == 999 ? '0' : '-1'}
          onClick={handleTabChange}
          onKeyDown={changeTabOnKeyDown}
          data-testid='tabWithContactFormBtn'
          className={
            currentTab == 999
              ? 'inline-block p-4 rounded-t-lg border-b-2 text-primary hover:text-primary dark:text-secondary dark:hover:text-secondary border-primary dark:border-secondary'
              : 'inline-block p-4 rounded-t-lg border-b-2 hover:text-primary dark:hover:text-secondary'
          }>
          <span className='inline  text-[16px]'>Kontakt</span>
        </button>
      </div>
      <div className={`textContainer`}>
        {tabs
          ? tabs.map((tab, i) => (
              <div
                key={`tabpanel-${i}`}
                id={`tabpanel-${i}`}
                data-testid={`tabpanel-${i}`}
                tabIndex='0'
                aria-labelledby={`tab-${i}`}
                className={
                  currentTab == i
                    ? 'block px-6 py-8 bg-gray-50 dark:bg-gray-800'
                    : 'hidden'
                }>
                <ReactMarkdown>{tab.Text}</ReactMarkdown>
              </div>
            ))
          : ''}
        <div
          key={`tabpanel-999`}
          id={`tabpanel-999`}
          data-testid={`tabpanel-kontakt-form`}
          tabIndex='0'
          aria-labelledby={`tab-999`}
          className={
            currentTab == 999
              ? 'block p-4 bg-gray-50 dark:bg-gray-800'
              : 'hidden'
          }>
          <ConatactForm sendContactTo={sendContactTo} />
        </div>
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
