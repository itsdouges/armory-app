// @flow

import type { Children } from 'react';

import { Component } from 'react';
import throttle from 'lodash/throttle';
import withinViewport from 'withinviewport';
import { addEvent } from 'lib/dom';
import noop from 'lodash/noop';

export type BaseProps<T> = {
  limit: number,
  count: number,
  rows: Array<T>,
  action: (limit: number, offset: number) => Promise<*>,
  children?: (item: T, index: number) => Children,
};

export type ExtraProps<T> = BaseProps<T> & {
  className?: string,
  progressComponent?: Children,
  infiniteScroll?: boolean,
  renderContainer?: (children: Children) => Children,
  renderButton?: (onClick: Function) => Children,
};

type Props<T> = BaseProps<T> & ExtraProps<T>;

type State = {
  loading: boolean,
  finished: boolean,
  infiniteScroll: boolean,
};

const renderDefaultContainer = (children) => <ul>{children}</ul>;
const renderDefaultButton = (onClick) => <button onClick={onClick}>Load More</button>;

export default class Paginator extends Component {
  props: Props<*>;
  _container: HTMLElement;
  _remove: () => void;

  static defaultProps = {
    children: noop,
    count: 9999,
    className: '',
  };

  state: State = {
    loading: false,
    finished: false,
    infiniteScroll: this.props.infiniteScroll || false,
  };

  componentWillMount () {
    const { limit } = this.props;
    this.props.action(limit, 0);
  }

  componentWillUnmount () {
    this._remove();
  }

  initialize = () => {
    this.setState({
      infiniteScroll: true,
    });

    this._remove = addEvent('scroll', throttle(this.paginate, 50));
    this.paginate(true);
  };

  paginate = (force: boolean) => {
    const { loading, finished } = this.state;

    if (!finished && !loading && (force || withinViewport(this._container))) {
      const { action, limit, count, rows } = this.props;

      if (rows.length < count) {
        this.setState({
          loading: true,
        });

        action(limit, rows.length).then(() => this.setState({
          loading: false,
        }));
      } else {
        this.setState({
          finished: true,
        });

        this._remove();
      }
    }
  };

  render () {
    const {
      className,
      children,
      rows,
      progressComponent,
      renderContainer = renderDefaultContainer,
      renderButton = renderDefaultButton,
    } = this.props;

    const { finished, infiniteScroll } = this.state;
    const childComponents = (rows || []).map(children || noop);

    return (
      <div className={className}>
        {renderContainer(childComponents)}

        {infiniteScroll || renderButton(this.initialize)}

        {!finished && infiniteScroll && (
          <div ref={(c) => (this._container = c)}>
            {progressComponent}
          </div>
        )}
      </div>
    );
  }
}
