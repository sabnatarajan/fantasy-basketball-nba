import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

$(document).ready(function () {
  $('.collapsible').collapsible();

  $('input.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Microsoft": null,
      "Google": 'https://placehold.it/250x250',
      "aksd": null,
      "a12ksd": null,
      "aks4d": null,
      "aks1d": null,
      "aks12d": null,
      "aks1d": null,
      "aks1242d": null,
      "aks1234t2345d1": null,
    },
    limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function (val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
});

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<Main />, document.getElementById('app'));
