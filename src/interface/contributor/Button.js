import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import lazyLoadComponent from 'common/lazyLoadComponent';
import retryingPromise from 'common/retryingPromise';
import Modal from 'interface/modals/Modal';

import makeContributorUrl from './makeUrl';

const ContributorDetails = lazyLoadComponent(() => retryingPromise(() => import(/* webpackChunkName: 'ContributorPage' */ './Details').then(exports => exports.default)));

class Button extends React.PureComponent {
  static propTypes = {
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    link: PropTypes.bool,
  };
  static defaultProps = {
    link: true,
  };
  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      open: true,
    });
  }
  handleOnClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { nickname, avatar, link } = this.props;

    let content = (
      <div className="contributor">
        {avatar && <img src={avatar} alt="Avatar" />}
        {nickname}
      </div>
    );
    if (link) {
      content = (
        <Link to={makeContributorUrl(nickname)} onClick={this.handleClick}>
          {content}
        </Link>
      );
    }

    return (
      <>
        {content}
        {this.state.open && (
          <Modal onClose={this.handleOnClose}>
            <ContributorDetails contributorId={nickname} />
          </Modal>
        )}
      </>
    );
  }
}

export default Button;
