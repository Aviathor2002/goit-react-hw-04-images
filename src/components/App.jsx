import { React, Component } from 'react';
import { AppDiv } from './App.style';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  render() {
    return (
      <AppDiv>
        <Searchbar />
        <ImageGallery />
      </AppDiv>
    );
  }
}
