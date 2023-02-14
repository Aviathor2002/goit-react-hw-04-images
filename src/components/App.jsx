import { React, Component } from 'react';
import { AppDiv } from './App.style';
import Button from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from 'service/image-service';
import { Loader } from './Loader/Loader';
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
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName.trim() !== this.state.searchName.trim() ||
      prevState.page !== this.state.page
    ) {
      this.fetchImg();
    }
  }

  toggleModal = image => {
    // this.setState(({ showModal }) => ({ showModal: !showModal }));

    this.setState({ showModal: !this.state.showModal, largeImg: image });
  };
  onCloseModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = value => {
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
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],

        isVisible:
          page < Math.ceil(response.data.total / response.data.totalHits),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchName, page, images, isLoading } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmitClick={this.handleSubmit} />
        <ImageGallery images={images} onOpen={this.toggleModal} />
        {isLoading && <Loader />}
        {this.state.images.length !== 0 && (
          <Button loadMore={this.onLoadMore} isLoading={this.state.isLoading} />
        )}

        {this.state.showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={this.state.largeImg} alt="" />
          </Modal>
        )}
      </AppDiv>
    );
  }
}
