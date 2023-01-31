export const Heading = ({ level = 1, headingClass = '', children }) => {
  const updateLevel = Number.isInteger(level)
    ? level > 6
      ? 6
      : level < 1
      ? 1
      : level
    : 1;

  const HeadingLevel = `h${updateLevel}`;
  const primaryFontColor = headingClass.includes('text-white')
    ? 'text-white'
    : 'text-primary';

  return (
    <HeadingLevel
      data-testid='heading'
      className={`mb-4 text-3xl uppercase font-black ${primaryFontColor} text-center xl:mb-7 xl:text-4xl dark:text-secondary ${headingClass}`}>
      {children}
    </HeadingLevel>
  );
};
