import { React, Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.style';

export default class Searchbar extends Component {
  state = {
    text: '',
  };

  inputTextChange = event => {
    this.setState({ text: event.currentTarget.value.toLowerCase() });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.onSubmitClick(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.submitForm}>
          <SearchFormButton type="submit">
            Click
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.inputTextChange}
            value={this.state.text}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = { onSubmitClick: PropTypes.func.isRequired };
