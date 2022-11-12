export const Heading = ({ level = 1, children }) => {
  const updateLevel = Number.isInteger(level)
    ? level > 6
      ? 6
      : level < 1
      ? 1
      : level
    : 1;

  const HeadingLevel = `h${updateLevel}`;

  return (
    <HeadingLevel
      data-testid='heading'
      className='mb-4 text-2xl uppercase font-black text-primary text-center dark:text-secondary'>
      {children}
    </HeadingLevel>
  );
};
