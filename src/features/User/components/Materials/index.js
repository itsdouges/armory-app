// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import map from 'lodash/map';
import Container from 'common/components/Container';
import { actions } from 'armory-component-ui';
import Section from './Section';

import styles from './styles.less';
import { createFetch } from '../../actions';

type Props = {
  id: string,
  fetchMaterials: (Array<string>) => Promise<*>,
  fetchUserMaterials: (string) => Promise<*>,
  userMaterials: {
    [id: number]: { id: number, category: number, count: number },
  },
  materials: {
    [id: number]: {
      id: number,
      name: string,
      items: Array<number>,
      order: number,
    }
  },
};

export const selector = createSelector(
  (store) => (store.users.data[store.users.selected] || {}).materials || {},
  (store) => store.materials,
  (userMaterials, materials) => ({
    userMaterials,
    materials,
  }),
);

export default connect(selector, {
  fetchMaterials: actions.fetchMaterials,
  fetchItems: actions.fetchItems,
  fetchUserMaterials: createFetch('materials'),
})(
class UserMaterials extends Component<Props> {
  props: Props;

  componentDidMount () {
    this.props.fetchMaterials(['all']);
    this.props.fetchUserMaterials(this.props.id);
  }

  render () {
    const { materials, userMaterials } = this.props;

    const orderedMaterials = map(materials, (material) => (material.id ? material : null))
      .filter(Boolean)
      .sort(({ order: a }, { order: b }) => (a - b));

    return (
      <Container className={styles.root}>
        {orderedMaterials.map((material, index) =>
          <Section
            beginExpanded={index === 0}
            key={material.id}
            {...material}
            userMaterials={userMaterials}
          />
        )}
      </Container>
    );
  }
}
);
