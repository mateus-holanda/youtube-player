import { StyleSheet } from "react-native";

export const VIDEO_HEIGHT = 200;
export const SCREEN_SPACE = 24;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: SCREEN_SPACE
  },
  banner: {
    width: '100%',
    height: 75,
  },
  player: {
    width: '100%',
    height: VIDEO_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48
  },
  title: {
    color: '#FFF',
    fontSize: 18
  },
  progressBarContainer: {
    height: 56,
    backgroundColor: '#29292E',
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  value: {
    color: '#C4C4CC',
    marginRight: 7
  },
  tracker: {
    flex: 1,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#505059'
  },
  progressBar: {
    height: 3,
    backgroundColor: '#8257E5'
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});