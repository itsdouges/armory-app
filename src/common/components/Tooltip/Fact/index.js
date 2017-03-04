// @flow

import cx from 'classnames';

import styles from './styles.less';
import Icon from 'common/components/Icon';

const BASE_DAMAGE = 266.0;

function extractSubText (data) {
  return (
    data.hit_count ||
    data.field_type ||
    data.value ||
    data.distance ||
    data.finisher_type ||
    `${data.percent}%`
  );
}

function extractDamage(data) {
  const multiplier = data.dmg_multiplier || 1;

  return BASE_DAMAGE * multiplier * data.hit_count
}

type FactProps = {
  data: {
    type: string,
    value: string,
    icon: string,
    percent: string,
    text: string,
    target: string,
    source: string,
    duration: string,
    status: string,
    description: string,
    prefix: {
      status: string,
      icon: string,
    },
  },
};

const attributeTable = {
  "ConditionDamage": "Condition Damage",
  "Healing": "Healing Power",
};

const attributeToStat = (attribute) => {
  if ( ! attributeTable[attribute] ) {
    return attribute;
  }

  return attributeTable[attribute];
}

const Fact = ({ data }: FactProps) => {
  let content;

  switch (data.type) {
    case 'Recharge':
      content = (
        <div className={cx(styles.recharge, styles.center)}>
          {data.value} <Icon src={data.icon} size="micro" />
        </div>
      );
      break;

    case 'AttributeAdjust':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {attributeToStat(data.target)}: +{data.value}
        </div>
      );
      break;

    case 'Damage':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.text}: {extractDamage(data)}
        </div>
      );
      break;

    case 'Number':
    case 'Distance':
    case 'Radius':
    case 'Percent':
    case 'Range':
    case 'ComboFinisher':
    case 'ComboField':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.text}: {extractSubText(data)}
        </div>
      );
      break;

    case 'PrefixedBuff':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          <Icon src={data.prefix.icon} size="mini" />
          {data.prefix.status}
        </div>
      );
      break;

    case 'BuffConversion':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {`Gain ${data.target} based on a Percentage of ${data.source}: ${data.percent}%`}
        </div>
      );
      break;

    case 'NoData':
    case 'Unblockable':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.text}
        </div>
      );
      break;

    case 'Time':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" />
          {data.text}: {`${data.duration}s`}
        </div>
      );
      break;

    case 'Buff':
    case 'Type':
      content = (
        <div className={styles.center}>
          <Icon src={data.icon} size="mini" applyCount={data.apply_count} />
          {data.status}{`(${data.duration}s)`}: {data.description}
        </div>
      );
      break;

    default:
      console.error('Missing fact! Report this error to @itsmadou on twitter.', data);
      content = <span />;
      break;
  }

  return <span className={styles.fact}>{content}</span>;
};

export default Fact;
