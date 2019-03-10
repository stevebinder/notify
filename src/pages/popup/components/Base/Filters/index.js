import React, { useContext } from 'react';
import { WithHover } from 'src/hocs';
import { Context } from '../../../Store';
import styles from './styles';
import { getDetails, getLabelForValue, isSelected } from './utils';

export default () => {
  const { filters, notifications, setFilter } = useContext(Context);
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
};