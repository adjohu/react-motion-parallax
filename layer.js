import React, {PropTypes} from 'react';
import styles from './layer.scss';
import cx from 'classnames';

class Layer extends React.Component {
  static defaultProps = {
    xOffset: 0,
    depth: 0
  };

  getXTranslation() {
    const {xOffset, depth} = this.props;
    return -1 * xOffset * depth;
  }

  getStyle() {
    const {xOffset, depth} = this.props;

    return {
      transform: `translateX(${this.getXTranslation()}px)`,
      zIndex: 1000 - depth
    }
  }
  render() {
    const {children, className, ...props} = this.props;

    return (
      <div 
        {...props} 
        className={cx(className, styles.base)}
        style={this.getStyle()}
      >
        {children} 
      </div>
    )
  }
}

export default Layer;
