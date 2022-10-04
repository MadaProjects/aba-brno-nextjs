export const Heading = ({ level = 1, children }) => {
  const HeadingLevel = Number.isInteger(level)
    ? level > 6
      ? `h6`
      : level < 1
      ? `h1`
      : `h${level}`
    : `h1`;

  return (
    <HeadingLevel
      data-testid='heading'
      className='mb-4 text-2xl uppercase font-black text-primary'>
      {children}
    </HeadingLevel>
  );
};
