import React, { Component } from "react";
import LightboxImage from "../utils/lightboxImage";

class ProdImg extends Component {
  state = {
    lightbox: false,
    imageloc: 0,
    lightboximages: []
  };

  componentDidMount() {
    if (this.props.info.images.length > 0) {
      let lightboximages = [];
      this.props.info.images.forEach(item => {
        lightboximages.push(item.url);
      });
      this.setState({
        lightboximages
      });
    }
  }

  cardImgae = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image-available-soon.jpg`;
    }
  };

  lightboxHandler = pos => {
    if (this.state.lightboximages.length > 0) {
      this.setState({
        lightbox: true,
        imageloc: pos
      });
    }
  };

  closeLightboxHandler = () => {
    this.setState({
      lightbox: false
    });
  };

  showThumbs = () =>
    this.state.lightboximages.map((image, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.lightboxHandler(i)}
          className="thumb"
          style={{ background: `url(${image}) no-repeat` }}
        />
      ) : null
    );

  render() {
    const { info } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.cardImgae(info.images)}) no-repeat`
            }}
            onClick={() => this.lightboxHandler(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(info)}</div>

        {this.state.lightbox ? (
          <LightboxImage
            id={info.id}
            images={this.state.lightboximages}
            open={this.state.open}
            pos={this.state.imageloc}
            onClose={() => this.closeLightboxHandler()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
