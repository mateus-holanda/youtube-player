import { useState, useRef, useEffect } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import RemoteConfig from "@react-native-firebase/remote-config";

import { Banner } from "../../components/Banner";
import { ProgressBar } from "../../components/ProgressBar";
import { VideoCard } from "../../components/VideoCard";

import { styles } from "../../styles/global";

let videoIds = [
  "dQw4w9WgXcQ",
  "cOchidcyv9Q",
  "CcAYObnlehE",
  "e-P5IFTqB98",
  "d9MyW72ELq0",
  "kpz8lpoLvrA",
  "wBLGSAipX2M",
  "JUETbeMY1IE",
  "PKhAmNWME5M"
]

interface ScrollProps {
  layoutMeasurement: {
    height: number;
  };
  contentOffset: {
    y: number;
  };
  contentSize: {
    height: number;
  };
}

export function Home() {
  const [showBannerFlag, setShowBannerFlag] = useState(false);

  async function fetchRemoteConfig() {
    await RemoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 3000
    });

    await RemoteConfig().setDefaults({
      show_banner_flag: false
    });

    await RemoteConfig().fetchAndActivate();

    const response = RemoteConfig().getValue('show_banner_flag');
    setShowBannerFlag(response.asBoolean());
  }

  useEffect(() => {
    fetchRemoteConfig();
  }, []);

  const [percentage, setPercentage] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  const dimensions = useWindowDimensions();

  function scrollPercentage ({ layoutMeasurement, contentOffset, contentSize }: ScrollProps) {
    const visibleContent = Math.ceil((dimensions.height / contentSize.height) * 100);
    
    const value  = ((layoutMeasurement.height + contentOffset.y) / contentSize.height) * 100;
    
    setPercentage(value < visibleContent ? 0 : value);
  }

  function handleScrollMoveTop() {
    scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 50 }}
        onScroll={(event) => scrollPercentage(event.nativeEvent)}
      >
        {showBannerFlag && <Banner />}
        { 
          videoIds.map(videoId => (
              <VideoCard
                key={videoId}
                videoId={videoId}
              />
            )
          )
        }
      </ScrollView>
      
      <ProgressBar
        value={percentage}
        onMoveTop={handleScrollMoveTop}
      />
    </View>
  )
}