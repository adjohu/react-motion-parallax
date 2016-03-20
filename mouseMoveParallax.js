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

    this.handleResize = throttle(::this.handleResize, 80);
    this.handleMouseMove = throttle(::this.handleMouseMove, 80);
    this.handleTouchMove = throttle(::this.handleTouchMove, 80);
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
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
