import React, { useContext } from 'react';
import { Context } from 'src/popup/Store';
import { WithHover } from 'src/popup/hocs';

const styles = {
  container: {
    background: '#24292e',
    boxSizing: 'border-box',
    flex: '0 0 192px',
    height: '100%',
    overflow: 'auto',
    padding: '20px 0',
  },
  option: (hovered, selected) => ({
    backgroundColor: `rgba(255, 255, 255, ${selected ? 0.1 : hovered ? 0.03 : 0})`,
    color: `rgba(255, 255, 255, ${selected ? 0.88 : 0.38}`,
    cursor: 'pointer',
    overflow: 'hidden',
    padding: '3px 20px 3px 35px',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    hovered: hovered
  }),
  header: {
    color: '#fff',
    cursor: 'default',
    fontWeight: 'bold',
    margin: '0 20px 10px 20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  section: spaced => ({
    marginTop: spaced ? '20px' : '',
  }),
};

const getDetails = notifications => {
  const byRepository = notifications
    .reduce(
      (result, { repository: { name } }) => {
        if (!result.includes(name)) {
          return [...result, name];
        }
        return result;
      },
      [],
    )
    .sort();
  const byType = notifications
    .reduce(
      (result, { subject: { type } }) => {
        if (!result.includes(type)) {
          return [...result, type];
        }
        return result;
      },
      [],
    )
    .sort();
  const sections = [
    {
      label: 'Type',
      type: 'type',
      values: byType,
    },
    {
      label: 'Repos',
      type: 'repository',
      values: byRepository,
    },
  ];
  return sections.filter(({ values }) => values.length);
};

const getLabelForValue = value => {
  const defs = {

  }
  return value;
};

const isSelected = (filters, type, value) => filters.some(filter =>
  filter.type.toLowerCase() === type.toLowerCase()
  && filter.value.toLowerCase() === value.toLowerCase());

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