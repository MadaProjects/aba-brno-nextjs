import { NiceTitle } from '../Text/NiceTitle';
import { SimpleText } from '../Text/SimpleText';
import { TextWithImage } from '../Text/TextWithImage';
import { TextOnImage } from '../Text/TextOnImage';
import { ArticlesList } from '../Lists/ArticlesList';
import { ExpertsList } from '../Lists/ExpertsList';
import { Slider } from '../Slider/Slider';
import { TextSlider } from '../TextSlider/TextSlider';

export const DynamicZone = ({ element, numberOfTextWithImageBlocks }) => {
  let returnComponent = '';
  // TODO too much duplicities
  switch (element.__typename) {
    case 'ComponentPageText':
      const textData = element.text_block.data.attributes;
      const buttonLink =
        textData.InternalUrl && textData.InternalUrl.data
          ? textData.InternalUrl.data.attributes.Url
          : textData.ExternalUrl
          ? textData.ExternalUrl
          : false;
      const openLinkInNewTab =
        textData.InternalUrl && textData.InternalUrl.data ? false : true;

      return (
        <SimpleText
          headingLevel={1}
          headingText={textData.Title}
          paragraphText={textData.Text}
          perexText={textData.Perex}
          buttonText={textData.ButtonText}
          buttonLink={buttonLink}
          buttonNewTab={openLinkInNewTab}
        />
      );
      break;
    case 'ComponentPageTextWithImage':
      const textWithImage = element.text_block_with_image.data.attributes;
      const buttonLinkTextWithImage =
        textWithImage.InternalUrl && textWithImage.InternalUrl.data
          ? textWithImage.InternalUrl.data.attributes.Url
          : textWithImage.ExternalUrl
          ? textWithImage.ExternalUrl
          : false;
      const openLinkInNewTabTextWithImage =
        textWithImage.InternalUrl && textWithImage.InternalUrl.data
          ? false
          : true;

      return element.text_block_with_image.data ? (
        <TextWithImage
          headingLevel={1}
          headingText={textWithImage.Title}
          perexText={textWithImage.Perex}
          paragraphText={textWithImage.Text}
          imgUrl={textWithImage.Image.data.attributes.url}
          imgData={textWithImage.Image}
          buttonText={textWithImage.ButtonText}
          buttonLink={buttonLinkTextWithImage}
          buttonNewTab={openLinkInNewTabTextWithImage}
          isEven={numberOfTextWithImageBlocks % 2}
        />
      ) : null;
      break;
    case 'ComponentPageNiceTitle':
      return (
        <NiceTitle
          headingText={element.Title}
          graphicText={element.GraphicTitle}
          perex={element.TextUnder}
        />
      );
      break;
    case 'ComponentPageTextOnImage':
      const textOnImgData = element.text_on_image.data.attributes;
      const textOnImgBtnLink = textOnImgData.InternalUrl
        ? textOnImgData.InternalUrl
        : textOnImgData.ExternalUrl
        ? textOnImgData.ExternalUrl
        : false;

      const textOnImgOpenLinkInNewTab =
        textOnImgData.InternalUrl && textOnImgData.InternalUrl.data
          ? false
          : true;

      return (
        <TextOnImage
          headingLevel={2}
          headingText={textOnImgData.Title}
          perexText={textOnImgData.Perex}
          paragraphText={textOnImgData.Text}
          backgroundImage={
            textOnImgData.BackgroundImage.data.attributes.url
          }
          imgData={textOnImgData.BackgroundImage}
          buttonText={textOnImgData.ButtonText}
          buttonLink={textOnImgBtnLink}
          buttonNewTab={textOnImgOpenLinkInNewTab}
        />
      );
      break;
    case 'ComponentPagePage':
      switch (element.ListOf) {
        case 'Therapeutist':
          return (
            <ExpertsList
              headingText={element.Title}
              perex={element.TextUnderTitle}
              graphicText={element.GraphicTitleSignpost}
              showAll={element.ShowAll ? element.ShowAll : false}
            />
          );
          break;
        default:
          return (
            <ArticlesList
              headingText={element.Title}
              perex={element.TextUnderTitle}
              graphicText={element.GraphicTitleSignpost}
              showAll={element.ShowAll ? element.ShowAll : false}
            />
          );
          break;
      }
      break;
    case 'ComponentPageSlider':
      const allSlides = element.sliders.data;

      return (
        <Slider
          slides={allSlides}
          showTextBlock={element.ShowTextBlock ? true : false}
          smallBanner={element.SmallBanner ? true : false}
        />
      );
      break;
    case 'ComponentPageTextSlider':
      const allTextSlides = element.text_on_sliders.data;
      const backgroundImage = element.BackgroundImage;

      return (
        <TextSlider
          slides={allTextSlides}
          backgroundImage={backgroundImage}
        />
      );
      break;
    case 'ComponentPagePhotoEfect':
      console.log(element);
      break;
    default:
      console.log(`Block element is not defined - ${element.__typename}`);
      return '';
  }
};
