import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, useWindowDimensions, View, Text } from "react-native";
import YoutubeIframe, { PLAYER_STATES, getYoutubeMeta } from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";

import { styles, VIDEO_HEIGHT, SCREEN_SPACE } from "../styles/global";

interface VideoCardProps {
  videoId: string;
}

export function VideoCard({ videoId }: VideoCardProps) {
  const [videoReady, setVideoReady] = useState(false);

  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - (SCREEN_SPACE * 2);

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  const onChangeState = useCallback((state: string) => {
    if (state === PLAYER_STATES.ENDED) {
      Alert.alert("Video ended", "Please, hit the like, subscribe and share!")
    }
  }, []);

  async function fetchVideoTitle (videoId: string) {
    return await getYoutubeMeta(videoId).then(meta => meta.title);
  }

  const title = fetchVideoTitle(videoId);

  return (
    <View key={videoId} style={styles.player}>
      <YoutubeIframe
        videoId={videoId}
        width={VIDEO_WIDTH}
        height={videoReady ? VIDEO_HEIGHT : 0}
        onReady={() => setVideoReady(true)}
        onFullScreenChange={onFullScreenChange}
        onChangeState={onChangeState}
      />

      { !videoReady && <ActivityIndicator color="red" /> }

      <Text style={styles.title}>{videoId}</Text>
    </View>
  );
}