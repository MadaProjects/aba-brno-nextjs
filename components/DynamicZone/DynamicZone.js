import { SimpleText } from '../Text/SimpleText';

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
    default:
      return '';
  }
};
