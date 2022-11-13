import { SimpleText } from '../Text/SimpleText';
import { TextWithImage } from '../Text/TextWithImage';

export const DynamicZone = ({ element }) => {
  let returnComponent = '';
  console.log(element);

  switch (element.__typename) {
    case 'ComponentPageText':
      const buttonLink = element.text_block.data.attributes.InternalUrl
        .data
        ? element.text_block.data.attributes.InternalUrl.data.attributes
            .Url
        : element.text_block.data.attributes.ExternalUrl
        ? element.text_block.data.attributes.ExternalUrl
        : false;
      const openLinkInNewTab = element.text_block.data.attributes
        .InternalUrl.data
        ? false
        : true;

      return (
        <SimpleText
          headingLevel={1}
          headingText={element.text_block.data.attributes.Title}
          paragraphText={element.text_block.data.attributes.Text}
          perexText={element.text_block.data.attributes.Perex}
          buttonText={element.text_block.data.attributes.ButtonText}
          buttonLink={buttonLink}
          buttonNewTab={openLinkInNewTab}
        />
      );
      break;
    case 'ComponentPageTextWithImage':
      const buttonLinkTextWithImage = element.text_block_with_image.data
        .attributes.InternalUrl.data
        ? element.text_block_with_image.data.attributes.InternalUrl.data
            .attributes.Url
        : element.text_block_with_image.data.attributes.ExternalUrl
        ? element.text_block_with_image.data.attributes.ExternalUrl
        : false;
      const openLinkInNewTabTextWithImage = element.text_block_with_image
        .data.attributes.InternalUrl.data
        ? false
        : true;

      return element.text_block_with_image.data ? (
        <TextWithImage
          headingLevel={1}
          headingText={element.text_block_with_image.data.attributes.Title}
          perexText={element.text_block_with_image.data.attributes.Perex}
          paragraphText={
            element.text_block_with_image.data.attributes.Text
          }
          imgUrl={
            element.text_block_with_image.data.attributes.Image.data
              .attributes.url
          }
          buttonText={
            element.text_block_with_image.data.attributes.ButtonText
          }
          buttonLink={buttonLinkTextWithImage}
          buttonNewTab={openLinkInNewTabTextWithImage}
        />
      ) : null;
      break;
    default:
      return '';
  }
};
