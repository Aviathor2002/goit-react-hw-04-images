import PropTypes from 'prop-types';
import {
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.style';

export const GalleryItem = ({ img, tag, onOpen, largeIMG }) => {
  return (
    <ImageGalleryItem>
      <ImageGalleryItemImage
        src={img}
        alt={tag}
        onClick={() => {
          onOpen(largeIMG, tag);
        }}
      />
    </ImageGalleryItem>
  );
};

GalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeIMG: PropTypes.string.isRequired,
};
