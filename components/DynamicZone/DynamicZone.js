import { NiceTitle } from '../Text/NiceTitle';
import { SimpleText } from '../Text/SimpleText';
import { TextWithImage } from '../Text/TextWithImage';
import { TextOnImage } from '../Text/TextOnImage';

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
      console.log(element);
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
          buttonText={textOnImgData.ButtonText}
          buttonLink={textOnImgBtnLink}
          buttonNewTab={textOnImgOpenLinkInNewTab}
        />
      );
      break;
    default:
      console.log(`Block element is not defined - ${element.__typename}`);
      return '';
  }
};
