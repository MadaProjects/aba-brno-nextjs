export const Heading = ({ level = 1, headingClass = '', children }) => {
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
      className={`mb-4 text-3xl uppercase font-black text-primary text-center xl:mb-7 xl:text-3xl dark:text-secondary ${headingClass}`}>
      {children}
    </HeadingLevel>
  );
};
