import React, {PropTypes} from 'react';
import Parallax from './parallax';
import throttle from 'lodash/function/throttle';
//import styles from './mouseMoveParallax.scss';

class MouseMoveParallax extends React.Component {
  static defaultProps = {
    
  };

  constructor() {
    super(...arguments);
    this.state = {
      mouseX: 0,
      mouseY: 0,
      centerX: 0,
      centerY: 0
    }
  }

  componentDidMount() {
    window.addEventListener('touchmove', throttle(::this.handleTouchMove, 80));
    window.addEventListener('mousemove', throttle(::this.handleMouseMove, 80));
    window.addEventListener('resize', throttle(::this.handleResize, 80));
    this.handleResize();
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  handleResize() {
    this.setState({
      centerX: window.innerWidth / 2,
      centerY: window.innerHeight / 2
    })
  }

  handleMouseMove({pageX: mouseX, pageY: mouseY}) {
    this.setState({
      mouseX, mouseY
    });
  }

  getMouseOffsetFromCenter() {
    const {centerX, centerY, mouseX, mouseY} = this.state;
    return {
      x: mouseOffset(centerX, mouseX),
      y: mouseOffset(centerY, mouseY)
    };
  }

  render() {
    const {children, ...props} = this.props;

    const mouseOffset = this.getMouseOffsetFromCenter();

    return (
      // <div {...props} className={styles.base}>
      <Parallax {...props} xOffset={mouseOffset.x}>
        {children} 
      </Parallax>
    )
  }
}

function mouseOffset(center, mousePos) {
  const offset = mousePos - center;
  const root = Math.sqrt(Math.abs(offset));
  if (offset < 0) return -1 * root;
  return root;
}

export default MouseMoveParallax;
