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
import { DecorativeSlider } from '../Slider/DecorativeSlider';

export const DynamicZone = ({
  element,
  numberOfTextWithImageBlocks,
  orderNumber,
  allWorkshops,
}) => {
  let returnComponent = '';

  // TODO too much duplicities
  switch (element.__typename) {
    case 'ComponentNewPageText':
      const allText = element.Text.map((textBlock, i) => {
        return (
          <SimpleText
            key={i}
            headingLevel={orderNumber === 0 && i === 0 ? 1 : 2}
            textData={textBlock}
          />
        );
      });

      return allText;
      break;
    case 'ComponentNewPageTextWithImage':
      let allTextWithImageBlocks = element.TextWithImageBlock.map(
        (textWithImageBlock, i) => {
          return (
            <TextWithImage
              key={i}
              headingLevel={orderNumber === 0 && i === 0 ? 1 : 2}
              blockData={textWithImageBlock}
              imageOnLeft={i % 2 === 0 ? true : false}
            />
          );
        }
      );

      return allTextWithImageBlocks;
      break;
    case 'ComponentNewPageNiceTitle':
      return (
        <NiceTitle
          headingText={element.Title}
          headingLevel={orderNumber === 0 ? 1 : 2}
          perex={element.TextUnder}
        />
      );
      break;
    case 'ComponentNewPageTextOnImage':
      return (
        <TextOnImage
          headingLevel={orderNumber === 0 ? 1 : 2}
          blockData={element}
        />
      );
      break;
    case 'ComponentNewPagePage':
      switch (element.ListOf) {
        case 'Therapeutist':
          return (
            <ExpertsList
              headingLevel={orderNumber === 0 ? 1 : 2}
              headingText={element.Title}
              perex={element.TextUnderTitle}
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
              showAll={element.ShowAll ? element.ShowAll : false}
            />
          );
          break;
      }
      break;
    case 'ComponentNewPageDecorativeImg':
      return <DecorativeSlider slide={element} />;
      break;
    case 'ComponentNewPageSliderNew':
      const allSlidesNew = element.Slide;

      return (
        <Slider
          headingLevel={orderNumber === 0 ? 1 : 2}
          slides={allSlidesNew}
        />
      );
      break;
    case 'ComponentNewPageTextSlider':
      return (
        <TextSlider
          slides={element.Slide}
          backgroundImage={element.Image}
        />
      );
      break;

    case 'ComponentNewPageTextWithPhotoEffect':
      return (
        <TextWithPhotosList
          list={element.PhotoBlock}
          title={element.TitleOnPage}
        />
      );

      break;
    case 'ComponentNewPageContactForm':
      return (
        <ConatactForm sendContactTo={element.WhereSendEmailsFromForm} />
      );
      break;
    default:
      console.log(`Block element is not defined - ${element.__typename}`);
      console.log(element);
      return '';
  }
};
