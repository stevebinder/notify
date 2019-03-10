export const getDetails = notifications => {
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

export const getLabelForValue = value => {
  const defs = {

  }
  return value;
};

export const isSelected = (filters, type, value) => filters.some(filter =>
  filter.type.toLowerCase() === type.toLowerCase()
  && filter.value.toLowerCase() === value.toLowerCase());