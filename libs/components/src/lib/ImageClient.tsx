import { ImageProps, Image } from '@chakra-ui/react';
import React from 'react';

export const ImageClient = (props: ImageProps) => {
  const [source, setSource] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSource(props.src ?? null);
  }, [props.src]);

  return source === null ? null : <Image {...props} src={source} />;
};
