import { shallow } from 'enzyme';
import _ from 'lodash';

const sandbox = sinon.sandbox.create();
const withinViewport = sandbox.stub();
const addEvent = sandbox.stub();
const removeEvent = sandbox.spy();

const Paginator = proxyquire('common/components/Paginator', {
  withinviewport: withinViewport,
  'lib/dom': { addEvent },
  'lodash/throttle': (func) => func,
});

const props = {
  action: sandbox.stub(),
  children: (i) => <div>{i}</div>,
  limit: 1,
  count: 4,
  rows: [1, 2, 3],
  className: 'classname',
  progressComponent: <progress />,
};

const create = (prps) =>
  shallow(<Paginator {..._.merge({}, props, prps)} />);

describe('<Paginator />', () => {
  beforeEach(() => sandbox.reset());

  const assertFinished = (wrapper) => {
    expect(wrapper.find('button')).to.not.exist;
    expect(wrapper.find('progress')).to.not.exist;
  };

  describe('rendering', () => {
    it('should pass classname down', () => {
      const wrapper = create();

      expect(wrapper).to.have.className(props.className);
    });

    it('should render container', () => {
      const wrapper = create();

      props.rows.forEach((row, index) => {
        const child = wrapper.find('ul').children().at(index);
        expect(child).to.contain(<div>{row}</div>);
      });
    });

    it('should render custom container', () => {
      const wrapper = create({
        // eslint-disable-next-line
        renderContainer: ({ children }) => <ol>{children}</ol>,
      });

      props.rows.forEach((row, index) => {
        const child = wrapper.find('ol').children().at(index);
        expect(child).to.contain(<div>{row}</div>);
      });
    });

    context('when not finished', () => {
      context('when infinite scroll', () => {
        it('should not show button', () => {
          const wrapper = create({
            infiniteScroll: true,
          });

          expect(wrapper.find('button')).to.not.exist;
        });

        it('should show progress', () => {
          const wrapper = create({
            infiniteScroll: true,
          });

          expect(wrapper.find('progress')).to.exist;
        });
      });

      context('when not infinite scroll', () => {
        it('should show button', () => {
          const wrapper = create({
            infiniteScroll: false,
          });

          expect(wrapper.find('button')).to.contain('Load More');
        });

        it('should show custom button', () => {
          const wrapper = create({
            infiniteScroll: false,
            // eslint-disable-next-line
            renderButton: (props) => <button {...props}>YOLO</button>,
          });

          expect(wrapper.find('button')).to.contain('YOLO');
        });
      });
    });

    context('when rows length is greater or equal to count on mount', () => {
      it('should finish immediately', () => {
        const wrapper = create({
          count: props.rows.length,
        });

        assertFinished(wrapper);
      });
    });
  });

  context('when component will mount', () => {
    it('should trigger initial action with initial offset', () => {
      create();

      expect(props.action).to.have.been.calledWith(props.limit, 0);
    });
  });

  context('when component unmounts', () => {
    it('should cleanup', () => {
      props.action.returns(Promise.reject());
      addEvent.withArgs('scroll').returns(removeEvent);
      const wrapper = create();
      wrapper.find('button').simulate('click');

      wrapper.unmount();

      expect(removeEvent).to.have.been.called;
    });
  });

  context('when component is receiving new props and is past the pagination threshold', () => {
    it('should finish', () => {
      const wrapper = create();

      wrapper.setProps({
        rows: [1, 2, 3, 4],
      });

      assertFinished(wrapper);
    });
  });

  context('when the load more button is clicked for the first time', () => {
    let wrapper;

    beforeEach(() => {
      props.action.returns(Promise.reject());
      addEvent.withArgs('scroll').returns(removeEvent);
      wrapper = create();
      wrapper.find('button').simulate('click');
    });

    it('should initialize infinite scrolling', () => {
      expect(wrapper.find('button')).to.not.exist;
    });

    it('should load next page', () => {
      expect(wrapper.find('progress')).to.exist;
      expect(props.action).to.have.been.calledWith(props.limit, props.rows.length);
    });

    context('when scrolling', () => {
      it('should load next page', () => {
        const [, loadNextPage] = addEvent.firstCall.args;

        loadNextPage();

        expect(props.action).to.have.been.calledWith(props.limit, props.rows.length);
      });
    });
  });


  describe('loading next page', () => {
    context('when paginator is already loading', () => {
      it('should do nothing', () => {
        props.action.returns(Promise.reject());
        addEvent.withArgs('scroll').returns(removeEvent);
        const wrapper = create();
        wrapper.find('button').simulate('click');
        const [, loadNextPage] = addEvent.firstCall.args;
        sandbox.reset();

        loadNextPage();
        loadNextPage();

        expect(props.action).to.not.have.been.called;
      });

      it('should reset after successfully loading', (done) => {
        let resolve;
        const promise = new Promise((reslve) => {
          resolve = reslve;
        });

        props.action.withArgs(props.limit, props.rows.length).returns(promise);
        addEvent.withArgs('scroll').returns(removeEvent);
        const wrapper = create();
        wrapper.find('button').simulate('click');
        const [, loadNextPage] = addEvent.firstCall.args;

        loadNextPage();
        resolve();
        props.action.reset();


        setTimeout(() => {
          props.action.withArgs(props.limit, props.rows.length).returns(promise);
          withinViewport.returns(true);
          loadNextPage();

          expect(props.action).to.have.been.calledWith(props.limit, props.rows.length);
          done();
        }, 1);
      });
    });
  });
});
