import { useState, useEffect } from 'react';
import { AppDiv } from './App.style';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from 'service/image-service';
import { Blocks } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageAlt, setImageAlt] = useState('');
  const [largeImg, setLargeImg] = useState(null);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    fetchImg();
  }, [searchName, page]);

  const toggleModal = (image, tag) => {
    setShowModal(true);
    setLargeImg(image);
    setImageAlt(tag);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = value => {
    if (value.trim() === '') {
      Notify.warning('Write smothing');
    }

    setSearchName(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(null);
  };

  const fetchImg = async () => {
    setIsLoading(true);

    try {
      const response = await getImages(searchName, page);

      if (response.data.hits.length === 0) {
        setIsEmpty(true);
        Notify.info(`We can't found ${searchName}`);
      } else {
        Notify.success('Success');
      }

      setImages([...images, ...response.data.hits]);
      setIsVisible(() => {
        return (
          page < Math.ceil(response.data.totalHits / response.data.hits.length)
        );
      });
    } catch (error) {
      Notify.failure(
        `Something is wrong, try to reload page! Error: ${error.message}`
      );
      setError(error.message);
    } finally {
      setIsLoading(isLoading);
    }
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <AppDiv>
      <Searchbar onSubmitClick={handleSubmit} />
      <ImageGallery images={images} onOpen={toggleModal} />
      {isLoading && <Blocks />}
      {isVisible && <Button loadMore={onLoadMore} isLoading={isLoading} />}

      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={largeImg} alt={imageAlt} />
        </Modal>
      )}
    </AppDiv>
  );
};
