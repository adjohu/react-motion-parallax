import React, {PropTypes, cloneElement} from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import styles from './parallax.scss';
import cx from 'classnames';

export class Parallax extends React.Component {
  static defaultProps = {
    xOffset: 0 
  };

  getDefaultStyles() {
    return React.Children.map(this.props.children, child => ({
      xOffset: 0
    }));
  }

  getStyles(prevInterpolatedStyles) {
    const {xOffset} = this.props;

    return prevInterpolatedStyles.map((_, i) => {
      return i === 0 
        ? {xOffset: spring(xOffset)}
        : {xOffset: spring(prevInterpolatedStyles[i-1].xOffset)}
    });
  }

  renderLayers(interpolatingStyles = []) {
    const {children} = this.props;
    return (
      <div>
        {interpolatingStyles.map(({xOffset}, i) => {
          return cloneElement(children[i], { xOffset, key: i });
        })}
      </div>
    );
  }

  render() {
    const {children, className, ...props} = this.props;

    return (
      <div {...props} className={cx(styles.base, className)}>
        <StaggeredMotion
          defaultStyles={::this.getDefaultStyles()}
          styles={::this.getStyles}
        >{::this.renderLayers}</StaggeredMotion>

      </div>
    )
  }
}

export {Layer} from './layer';
export default Parallax;