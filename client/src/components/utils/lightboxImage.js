import React, { Component } from "react";
import Lightbox from "react-images";

class LightboxImage extends Component {
  state = {
    lighboxIsOpen: true,
    currentImage: this.props.pos,
    images: []
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.images) {
      const images = [];
      nextProps.images.forEach(e => {
        images.push({ src: `${e}` });
      });

      return (prevState = {
        images
      });
    }
    return false;
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  closeLightbox = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div>
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.state.images}
          isOpen={this.state.lighboxIsOpen}
          onClickPrev={() => this.gotoPrevious()}
          onClickNext={() => this.gotoNext()}
          onClose={() => this.closeLightbox()}
        />
      </div>
    );
  }
}

export default LightboxImage;
