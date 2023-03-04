import { NiceTitle } from '../Text/NiceTitle';
import { SimpleText } from '../Text/SimpleText';
import { TextWithImage } from '../Text/TextWithImage';
import { TextOnImage } from '../Text/TextOnImage';
import { ArticlesList } from '../Lists/ArticlesList';
import { ExpertsList } from '../Lists/ExpertsList';
import { WorkshopsList } from '../Lists/WorkshopsList';
import { Slider } from '../Slider/Slider';
import { TextSlider } from '../TextSlider/TextSlider';
import { TextWithPhotosList } from '../Lists/TextWithPhotosList';
import { ConatactForm } from '../Form/ContactForm';

export const DynamicZone = ({
  element,
  numberOfTextWithImageBlocks,
  orderNumber,
  allWorkshops,
}) => {
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
          headingLevel={orderNumber === 0 ? 1 : 2}
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
          headingLevel={orderNumber === 0 ? 1 : 2}
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
          headingLevel={orderNumber === 0 ? 1 : 2}
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
          headingLevel={orderNumber === 0 ? 1 : 2}
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
              headingLevel={orderNumber === 0 ? 1 : 2}
              headingText={element.Title}
              perex={element.TextUnderTitle}
              graphicText={element.GraphicTitleSignpost}
              showAll={element.ShowAll ? element.ShowAll : false}
            />
          );
          break;
        case 'Workshops':
          return (
            <WorkshopsList
              workshops={allWorkshops}
              headingLevel={orderNumber === 0 ? 1 : 2}
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
              headingLevel={orderNumber === 0 ? 1 : 2}
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
          headingLevel={orderNumber === 0 ? 1 : 2}
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
      const listOfTexts = element.photo_efect_text.data;
      return (
        <TextWithPhotosList
          headingLevel={orderNumber === 0 ? 1 : 2}
          list={listOfTexts}
          headingText={element.Title}
          perex={element.TextUnderTitle}
          graphicText={element.GraphicTitlePhotoEffect}
        />
      );
      break;
    case 'ComponentPageContactForm':
      return (
        <ConatactForm sendContactTo={element.WhereSendEmailsFromForm} />
      );
      break;
    default:
      console.log(`Block element is not defined - ${element.__typename}`);
      return '';
  }
};
