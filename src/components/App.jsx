import { React, Component } from 'react';
import { AppDiv } from './App.style';
import Button from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from 'service/image-service';
import { Blocks } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    searchName: '',
    images: [],
    page: 1,
    isEmpty: false,
    isLoading: false,
    isVisible: false,
    error: null,
    showModal: false,
    largeImg: null,
    imageAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName.trim() !== this.state.searchName.trim() ||
      prevState.page !== this.state.page
    ) {
      this.fetchImg();
    }
  }

  toggleModal = (image, tag) => {
    // this.setState(({ showModal }) => ({ showModal: !showModal }));

    this.setState({ showModal: true, largeImg: image, imageAlt: tag });
  };
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = value => {
    if (value.trim() === '') {
      Notify.warning('Write smothing');
    }
    this.setState({
      searchName: value,
      images: [],
      page: 1,
      isEmpty: false,
      error: null,
    });
  };

  fetchImg = async () => {
    this.setState({ isLoading: true });
    try {
      const { searchName, page } = this.state;
      const response = await getImages(searchName, page);

      if (response.data.hits.length === 0) {
        this.setState({ isEmpty: true });
        Notify.info(`We can't found ${searchName}`);
      } else {
        Notify.success('Success');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],

        isVisible:
          page < Math.ceil(response.data.totalHits / response.data.hits.length),
      }));
    } catch (error) {
      Notify.failure(
        `Something is wrong, try to reload page! Error: ${error.message}`
      );
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, largeImg, imageAlt, isVisible } = this.state;
    console.log(this.state);
    return (
      <AppDiv>
        <Searchbar onSubmitClick={this.handleSubmit} />
        <ImageGallery images={images} onOpen={this.toggleModal} />
        {isLoading && <Blocks />}
        {isVisible && (
          <Button loadMore={this.onLoadMore} isLoading={isLoading} />
        )}

        {this.state.showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={largeImg} alt={imageAlt} />
          </Modal>
        )}
      </AppDiv>
    );
  }
}
