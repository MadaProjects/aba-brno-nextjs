import { SimpleText } from '../Text/SimpleText';
import { TextWithImage } from '../Text/TextWithImage';

export const DynamicZone = ({ element }) => {
  let returnComponent = '';

  // TODO too much duplicities
  switch (element.__typename) {
    case 'ComponentPageText':
      const textData = element.text_block.data.attributes;
      const buttonLink = textData.InternalUrl.data
        ? textData.InternalUrl.data.attributes.Url
        : textData.ExternalUrl
        ? textData.ExternalUrl
        : false;
      const openLinkInNewTab = textData.InternalUrl.data ? false : true;

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
      const buttonLinkTextWithImage = textWithImage.InternalUrl.data
        ? textWithImage.InternalUrl.data.attributes.Url
        : textWithImage.ExternalUrl
        ? textWithImage.ExternalUrl
        : false;
      const openLinkInNewTabTextWithImage = element.text_block_with_image
        .data.attributes.InternalUrl.data
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
        />
      ) : null;
      break;
    default:
      return '';
  }
};
