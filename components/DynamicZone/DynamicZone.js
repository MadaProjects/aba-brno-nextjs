import { SimpleText } from '../Text/SimpleText';
import { TextWithImage } from '../Text/TextWithImage';

export const DynamicZone = ({ element }) => {
  let returnComponent = '';
  console.log(element);

  switch (element.__typename) {
    case 'ComponentPageText':
      return (
        <SimpleText
          headingLevel={1}
          headingText={element.text_block.data.attributes.Title}
          paragraphText={element.text_block.data.attributes.Text}
        />
      );
      break;
    case 'ComponentPageTextWithImage':
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
        />
      ) : null;
      break;
    default:
      return '';
  }
};
