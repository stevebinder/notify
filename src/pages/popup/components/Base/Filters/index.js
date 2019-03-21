import React, { memo, useContext } from 'react';
import { WithHover } from 'src/hocs';
import { Context } from '../../../Store';
import styles from './styles';
import { getDetails, getLabelForValue, isSelected } from './utils';

// We create the Component here, and make sure to make it a "memoized" component
// or a PureComponent in order to only rerender when props change.
const Component = memo(({ filters, notifications, setFilter }) => {
  const details = getDetails(notifications);
  const makeOnClick = (type, value) => event => setFilter(
    type,
    value,
    !!(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey),
  );
  return (
    <div style={styles.container}>
      {details.map(({ label, type, values }, index) => (
        <div key={label} style={styles.section(!!index)}>
          <div style={styles.header}>{label}</div>
          <div>
            {values.map(value => (
              <WithHover key={value}>
              {hovered => (
                <div
                  onClick={makeOnClick(type, value)}
                  style={styles.option(hovered, isSelected(filters, type, value))}
                >
                  {getLabelForValue(value)}
                </div>
              )}
              </WithHover>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

// We create a "container" or "hoc" here to pass down only the
// data we want from the context. This way, if some other property changes
// on this context the Component won't know about it, and it won't rerender.
export default props => {
  const { filters, notifications, setFilter } = useContext(Context);
  const data = { filters, notifications, setFilter };
  return <Component {...data} {...props} />;
};