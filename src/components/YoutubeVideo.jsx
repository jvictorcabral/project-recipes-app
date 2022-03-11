import React from 'react';
import PropTypes from 'prop-types';

function YoutubeVideo({ video }) {
  return (
    <iframe
      data-testid="video"
      src={ video.replace('watch?v=', 'embed/') }
      title="video"
    />
  );
}

export default YoutubeVideo;

YoutubeVideo.propTypes = {
  video: PropTypes.string,
}.isRequired;
