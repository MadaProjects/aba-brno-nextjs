import ReactMarkdown from 'react-markdown';

export const PriceList = ({ pricelist = [], textBefore, textAfter }) => {
  return (
    <div className='flex flex-col  l-1/2 w-full'>
      <div className='flex flex-col w-full'>
        {textBefore ? (
          <div
            className='w-full mb-6 md:mb-12'
            dangerouslySetInnerHTML={{ __html: textBefore }}
          />
        ) : (
          ''
        )}
        <div className='w-full'>
          <table className='w-full pricelist-table'>
            <thead>
              <tr className='mb-4'>
                <th className='text-left text-lg pb-2 px-4 md:px-8'>
                  Název
                </th>
                <th className='text-center text-lg'>Cena</th>
              </tr>
            </thead>
            <tbody className='border-2 border-primary dark:border-secondary'>
              {pricelist.map((item, i) => (
                <tr
                  key={item.id}
                  className={`border-b-2  border-primary dark:border-secondary ${
                    i % 2
                      ? 'bg-slate-200 dark:bg-slate-800'
                      : 'bg-white dark:bg-gray-900'
                  }`}>
                  <td className='py-2 px-4 md:py-4 md:px-8 border-r-2  border-primary dark:border-secondary'>
                    <ReactMarkdown>{item.LeftRow}</ReactMarkdown>
                  </td>
                  <td className='py-2 px-4 md:py-4 md:px-8 flex justify-end text-right right-col'>
                    <ReactMarkdown>{item.RightRow}</ReactMarkdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {textAfter ? (
          <div
            className='w-full mt-6 text-center md:text-right text-sm italic'
            dangerouslySetInnerHTML={{ __html: textAfter }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
