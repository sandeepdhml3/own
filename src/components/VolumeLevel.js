function VolumeLevel({ percentage = '100%', vertical = false, className }) {
  const style = vertical ? { height: percentage } : { width: percentage };

  return (
    <div className={classNames(className, 'video-react-volume-level')} style={style}>
      <span className="video-react-control-text" />
    </div>
  );
}

// Remove defaultProps
// VolumeLevel.defaultProps = {
//   percentage: '100%',
//   vertical: false
// };
