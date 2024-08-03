import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbar = ({ children }) => {
  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: '#000',
      borderRadius: '4px',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const renderTrackVertical = ({ style, ...props }) => {
    const trackStyle = {
      right: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  return (
    <Scrollbars
      renderThumbVertical={renderThumb}
      renderTrackVertical={renderTrackVertical}
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;
