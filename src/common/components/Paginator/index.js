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
  initialOffset?: number,
};

export type ButtonProps = {
  onClick: Function,
};

export type ContainerProps = {
  children: Children,
};

export type ExtraProps<T> = BaseProps<T> & {
  className?: string,
  progressComponent?: Children,
  infiniteScroll?: boolean,
  renderContainer?: (props: ContainerProps) => Children,
  renderButton?: (props: ButtonProps) => Children,
};

type Props<T> = BaseProps<T> & ExtraProps<T>;

type State = {
  loading: boolean,
  finished: boolean,
  infiniteScroll: boolean,
};

const renderDefaultContainer = (props: ContainerProps) => <ul>{props.children}</ul>;
const renderDefaultButton = (props: ButtonProps) => <button onClick={props.onClick}>Load More</button>;

export default class Paginator extends Component {
  props: Props<*>;
  _loading: boolean;
  _container: HTMLElement;
  _remove: ?() => void;

  static defaultProps = {
    children: noop,
    count: 9999,
    className: '',
    initialOffset: 0,
  };

  state: State = {
    loading: true,
    finished: false,
    infiniteScroll: this.props.infiniteScroll || false,
  };

  componentWillMount () {
    this.props.action(this.props.limit, this.props.initialOffset).then(() => this.setState({
      loading: false,
    }));

    this.checkIfFinished(this.props);
  }

  componentWillReceiveProps (nextProps: Props<*>) {
    this.checkIfFinished(nextProps);
  }

  componentWillUnmount () {
    this._remove && this._remove();
  }

  checkIfFinished (props: Props<*>) {
    if (props.rows.length >= props.count) {
      this.setState({
        finished: true,
      });

      this._remove && this._remove();
      delete this._remove;
    }
  }

  initialize = () => {
    this.setState({
      infiniteScroll: true,
    });

    this._remove = addEvent('scroll', throttle(() => this.paginate(false), 50));
    this.paginate(true);
  };

  paginate = (force: boolean) => {
    const { finished } = this.state;

    if (!finished && !this._loading && (force || withinViewport(this._container))) {
      const { action, limit, count, rows } = this.props;

      if (rows.length < count) {
        this._loading = true;

        action(limit, rows.length).then(() => {
          this._loading = false;
        });
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

    const { finished, infiniteScroll, loading } = this.state;
    const childComponents = (rows || []).map(children || noop);

    return (
      <div className={className}>
        {renderContainer({ children: childComponents })}

        {!finished && !infiniteScroll && !loading && renderButton({ onClick: this.initialize })}

        {!finished && infiniteScroll && (
          <div ref={(c) => (this._container = c)}>
            {progressComponent}
          </div>
        )}
      </div>
    );
  }
}
