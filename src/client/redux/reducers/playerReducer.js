import {
    TRACK_LOAD,
    TRACK_PLAY,
    TRACK_PAUSE,
    TRACK_STOP,
    TRACK_SEEK,
    TRACK_PLAYING,
    SET_ANALYSER
  } from "../actions/types";
  
  export const initialState = {
    loading: false,
    trackId: 1,
    status: "stop",
    currentTime: 0,
    seekToSeconds: null,
    trackMetadata: {
        _id: 1,
        audioUrl: "https://res.cloudinary.com/dcdnt/video/upload/v1630957881/demo_2_48000.mp3",
        title: "Iteration 1",
        subtitle: "Octatrack, DFAM, Digitakt, Digitone, Analog Rytm",
        duration: 700
    },
    analyser: null
  };
  
  export const playerReducer = (state = initialState, action) => {
      switch (action.type) {
      case SET_ANALYSER: {
        return {
          ...state,
          analyser: action.payload
        }
      }
      case TRACK_LOAD:
                return {
                  ...state,
                    trackMetadata: action.payload,
                    trackId: action.payload._id,
                    seekToSeconds: null
              }
      case TRACK_PLAY:
        return {
          ...state,
            status: "play",
            seekToSeconds: null,
            trackMetadata: action.payload,
            trackId: action.payload._id
        }
      case TRACK_PAUSE:
        return {
            ...state,
            status: "pause",
            seekToSeconds: null,
            trackMetadata: action.payload,
            trackId: action.payload._id
        }
      case TRACK_STOP:
        return {
          ...state,
          status: "stop",
          seekToSeconds: null,
          trackMetadata: action.payload,
          trackId: action.payload._id
        }
      case TRACK_SEEK:
        return {
          ...state,
          seekToSeconds: action.seekToSeconds,
          trackMetadata: action.payload,
          trackId: action.payload._id
        }
      case TRACK_PLAYING:
        return {
          ...state,
          seekToSeconds: null,
          currentTime: action.currentTime,
        }
          default:
              return state;
      }
  };
  