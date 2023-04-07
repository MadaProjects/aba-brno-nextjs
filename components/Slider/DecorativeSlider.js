export const DecorativeSlider = ({ slide }) => {
  return (
    <div
      className={`block mx-auto relative bg-no-repeat bg-center bg-cover h-[25vh] min-h-[200px] lg:min-h-[300px]`}
      style={{
        backgroundImage: `url(${slide.Image.data.attributes.url})`,
      }}></div>
  );
};
