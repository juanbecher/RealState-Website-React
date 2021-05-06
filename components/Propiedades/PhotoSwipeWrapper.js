import React, { useEffect, useRef } from 'react';

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';


const PhotoSwipeWrapper = props => {
  let pswpElement = useRef(null);

  const options = {
    index: props.index || 0,
    closeOnScroll: false,
    history: false,
    bgOpacity: 0.6
  };

  useEffect(() => {
    const photoSwipe = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, props.items, options);

    if (photoSwipe) {
      if (props.isOpen) {
        photoSwipe.init();

        photoSwipe.listen('destroy', () => {
          props.onClose();
        });

        photoSwipe.listen('close', () => {
          props.onClose();
        });
      }
      if (!props.isOpen) {
        props.onClose();
      }
    }
  }, [props, options]);

  return (
    <div
      className="pswp"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      ref={node => {
        pswpElement = node;
      }}
    >
      <div className="pswp__bg" />
      <div className="pswp__scroll-wrap">
        <div className="pswp__container">
          <div className="pswp__item" />
          <div className="pswp__item" />
          <div className="pswp__item" />
        </div>
        <div className="pswp__ui pswp__ui--hidden">
          <div className="pswp__top-bar">
            <div className="pswp__counter" />
            <button className="pswp__button pswp__button--close" title="Close (Esc)" />
            <button className="pswp__button pswp__button--share" title="Share" />
            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />
            <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />
            <div className="pswp__preloader">
              <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                  <div className="pswp__preloader__donut" />
                </div>
              </div>
            </div>
          </div>
          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div className="pswp__share-tooltip" />
          </div>
          <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />
          <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />
          <div className="pswp__caption">
            <div className="pswp__caption__center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSwipeWrapper;