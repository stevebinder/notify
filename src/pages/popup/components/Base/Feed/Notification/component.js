import React, { PureComponent } from 'react';
import { WithHover } from 'src/hocs';
import styles from './styles';
import { getColor, getIsNew, getTime, getUrl } from './utils';

export const renderIcon = ({ subject: { type } }) => {
  if (type === 'Issue') {
    return (
      <svg style={styles.icon} viewBox="0 0 14 16">
        <path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71
          5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14
          0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" />
      </svg>
    );
  }
  if (type === 'PullRequest') {
    return (
      <svg style={styles.icon} viewBox="0 0 12 16">
        <path d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46
          2.35 8.78 2.03 8 2H7V0L4 3l3
          3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10
          15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2
          0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2
          1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993
          1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98
          1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2
          0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8
          3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55
          1.2-1.2 1.2z" />
      </svg>
    );
  }
  if (type === 'Release') {
    return (
      <svg style={styles.icon} viewBox="0 0 14 16">
        <path d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1
          3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41
          0l4.59-4.59a.996.996 0 0 0 0-1.41L7.73 1.73zM2.38
          7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42
          0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01
          3h2v2H3V3h.01z" />
      </svg>
    );
  }
  return null;
};

export default class extends PureComponent {

  onClick = () => window.open(getUrl(this.props.notification));

  render() {
    return (
      <WithHover>
      {hovered => (
        <div
          onClick={() => window.open(getUrl(this.props.notification))}
          style={styles.container(
            getIsNew(this.props.notification),
            this.props.space,
            hovered,
          )}
        >
          <div style={styles.header}>
            <div style={styles.graphic}>
              <img
                style={styles.owner}
                src={this.props.notification.repository.owner.avatar_url}
              />
              <div style={styles.action(getColor(this.props.notification))}>
                {renderIcon(this.props.notification)}
              </div>
            </div>
            <div style={styles.title}>
              {this.props.notification.repository.name}
            </div>
            <div style={styles.time}>
              {getTime(this.props.notification)}
            </div>
          </div>
          <div style={styles.body}>
            {this.props.notification.subject.title}
          </div>
        </div>
      )}
      </WithHover>
    );
  }
}