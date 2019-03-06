import React, { useContext } from 'react';
import { Context } from 'src/popup/Store';

const styles = {
  container: {
    background: '#999',
    boxSizing: 'border-box',
    flex: '0 0 auto',
    height: '100%',
    overflow: 'auto',
    padding: '30px',
  },
  option: selected => ({
    color: selected ? 'red' : 'black',
    cursor: 'pointer',
    marginLeft: '20px',
    userSelect: 'none',
  }),
  header: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  section: spaced => ({
    marginTop: spaced ? '20px' : '',
  }),
};

const getDetails = notifications => {
  const sections = [];
  const byType = getTypes(notifications);
  if (byType.length) {
    sections.push({
      label: 'Type',
      type: 'type',
      values: byType,
    });
  }
  const byRepository = getRepositories(notifications);
  if (byRepository.length) {
    sections.push({
      label: 'Repos',
      type: 'repository',
      values: byRepository,
    });
  }
  return sections;
};

const getTypes = notifications => notifications
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

const getRepositories = notifications => notifications
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
              <div
                key={value}
                onClick={makeOnClick(type, value)}
                style={styles.option(isSelected(filters, type, value))}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};