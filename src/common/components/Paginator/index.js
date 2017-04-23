// @flow

import type { Children } from 'react';

import { Component } from 'react';
import throttle from 'lodash/throttle';
import withinViewport from 'withinviewport';
import { addEvent } from 'lib/dom';
import noop from 'lodash/noop';

type Props<T> = {
  limit: number,
  count: number,
  rows: Array<T>,
  action: (limit: number, offset: number) => Promise<>,
  children: (item: T, index: number) => Children,
  containerElement: any,
  className: string,
  progressComponent: Children,
  containerProps: { [string]: string },
};

type State = {
  loading: boolean,
  finished: boolean,
};

export default class Paginator extends Component {
  props: Props<*>;
  _container: HTMLElement;
  _remove: () => void;

  static defaultProps = {
    children: noop,
    count: 9999,
    className: '',
    containerElement: 'ul',
    containerProps: {},
  };

  state: State = {
    loading: false,
    finished: false,
  };

  componentWillMount () {
    const { limit } = this.props;
    this.props.action(limit, 0);
  }

  componentDidMount () {
    this._remove = addEvent('scroll', throttle(this.paginate, 50));
  }

  componentWillUnmount () {
    this._remove();
  }

  paginate = () => {
    const { loading, finished } = this.state;

    if (!finished && !loading && withinViewport(this._container)) {
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
      containerElement: Container,
      containerProps,
    } = this.props;

    const { finished } = this.state;

    return (
      <div className={className}>
        <Container {...containerProps}>
          {(rows || []).map(children)}
        </Container>

        {!finished && (
          <div ref={(c) => (this._container = c)}>
            {progressComponent}
          </div>
        )}
      </div>
    );
  }
}
