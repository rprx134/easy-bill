import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './AutoSuggest.css';

class AutoSuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.props.suggestions
      .map(section => {
        return {
          title: section.title,
          suggestions: section.suggestions.filter(suggestions => {
            return regex.test(suggestions.title);
          })
        };
      })
      .filter(section => section.suggestions.length > 0);
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.suggestions;
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.suggestions}</span>
    );
  }

  renderSectionTitle = (section) => {
    return (
      <strong>{section.title}</strong>
    );
  }

  getSectionSuggestions = (section) => {
    return section.suggestions;
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.onSelectionHandler(suggestion._id);
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeHolder,
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    );
  }
}

export default AutoSuggest;
